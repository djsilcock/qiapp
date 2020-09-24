import {
  observable,
  get as mobxGet,
  set as mobxSet,
  values as mobxValues,
} from "mobx";
import { fromPromise } from "mobx-utils";
import _ from "lodash";
import { IPromiseBasedObservable } from "mobx-utils";
import { ReactNode } from "react";

export interface FieldObservable {
  name: string;
  formDefinition: any[];
  touched: boolean;
  readonly _validationResults: IPromiseBasedObservable<string[]>;
  readonly validState: "valid" | "invalid" | "validating";
  readonly errors: string[];
  _value: any;
  value: any;
  readonly shouldDisplayError: boolean;
  helptext: ReactNode;
  placeholder: string;
  readonly isActive: boolean;
  reInitialise(newData: { [key: string]: any }): void;
}
interface ActivateObservable {
  result: { [key: string]: boolean };
}

interface ValidateObservable {
  result: { [key: string]: string[] };
}

export interface FormObservable {
  fields: { [key: string]: FieldObservable };
  parentForm: FormObservable;
  data: any;
  fieldActivators: ActivateObservable[];
  validators: ValidateObservable[];
  fieldsActive: { [name: string]: boolean };
  fieldErrors: { [name: string]: string[] | Promise<string[]> };
  allFieldsShouldValidate: boolean;
  touchedFields: string[];
  allValues: any;
  registerField(fieldDef: any): FieldObservable;
}

export function makeFormObservable({
  parentForm = undefined,
  validateMode = "onSubmit",
} = {}): FormObservable {
  const formObservable = observable<FormObservable>({
    fields: {},
    parentForm,
    data: {},
    allFieldsShouldValidate: false,
    validators: [],
    fieldActivators: [],
    get validationState() {
      const fieldErrors = _.mapValues();
    },
    get fieldsActive() {
      const activeFields = _.mapValues(this.fields, () => true);
      this.fieldActivators.forEach((activator) =>
        Object.assign(activeFields, activator.result)
      );
      return activeFields;
    },
    get fieldErrors() {
      const errors = _.mapValues(this.fields, () => []);
      this.validators.forEach((validator) =>
        _.mergeWith(errors, validator.result, (old, additional) => {
          //if validator returns promise, errors object contains promise to whole errors list (later converted to observable)
          if (old?.then?.call || additional?.then?.call) {
            return Promise.all([
              Promise.resolve(old),
              Promise.resolve(additional),
            ]).then(([old, additional]) => old.concat(additional));
          }
          return old.concat(additional);
        })
      );
      return errors;
    },
    get touchedFields() {
      return this.fieldOrder.filter(
        (fieldname) =>
          (mobxGet(this.fields, fieldname) as FieldObservable)?.touched
      );
    },
    set touchedFields(fieldsToTouch) {
      mobxValues(this.fieldOrder).forEach((field) => {
        field.touched = fieldsToTouch.includes(field.name);
      });
    },
    get allValues() {
      const returnValues = {};
      Object.values(
        this.fields
      ).forEach((field: { name: string; value: any }) =>
        _.set(returnValues, field.name, field.value)
      );
      return returnValues;
    },
    set allValues(values) {
      Object.values(this.fields).forEach((field: FieldObservable) => {
        field.reInitialise(values);
      });
    },
    registerField(fieldDef) {
      const {
        name,
        defaultValue,
        helptext,
        placeholder,
        activeIf,
        validIf,
        ...componentProps
      } = fieldDef;
      if (formObservable.fields[name]) return formObservable.fields[name];
      const fieldObservable = observable({
        name,
        formDefinition: formObservable.formDefinition,
        touched: false,
        get _validationResults() {
          return fromPromise.resolve(formObservable.fieldErrors[name]);
        },
        get validState() {
          return this._validationResults.state == "fulfilled"
            ? Object.keys(this.validationResults.value).length == 0
              ? "valid"
              : "invalid"
            : "validating";
        },
        get errors() {
          return this._validationResults.value;
        },
        _value: defaultValue,
        get value() {
          return this.isActive ? this._value : undefined;
        },
        set value(v) {
          this._value = v;
        },
        get shouldDisplayError() {
          return (
            (this.touched && validateMode == "onBlur") ||
            formObservable.allFieldsShouldValidate
          );
        },
        helptext,
        placeholder,
        componentProps,
        get isActive() {
          return formObservable.fieldsActive[name];
        },
        reInitialise(newData: { [key: string]: any }) {
          this._value = _.get(newData, name);
          this.touched = false;
        },
      });
      mobxSet(formObservable.fields, name, fieldObservable);
      if (activeIf) {
        const activator = observable({
          get result() {
            return activeIf.call(fieldObservable);
          },
        });
        formObservable.activators.push(activator);
      }
      if (validIf) {
        const validator = observable({
          get result() {
            return validIf.call(fieldObservable);
          },
        });
        formObservable.validators.push(validator);
      }
      return fieldObservable;
    },
  });

  return formObservable;
}
