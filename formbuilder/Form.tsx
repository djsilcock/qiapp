import React, { ReactNode, MutableRefObject, Component } from "react";
import { Form as SUIForm, Table, Button } from "semantic-ui-react";
import {
  observable,
  get as mobxGet,
  set as mobxSet,
  values as mobxValues,
  computed,
  ObservableMap,
  reaction,
} from "mobx";
import { fromPromise } from "mobx-utils";

import _ from "lodash";

function defaultValidator(form, fieldsToValidate) {
  console.warn("using default validator which always returns ok");
  return { valid: true, isValidating: false, errors: {} };
}
function defaultActiveFields(form, fieldsToCheck) {
  console.warn("using default activator which always returns active");
  return _.mapValues(form.fields, () => true);
}
export const FormContext = React.createContext(null);
export function makeFormObservable({
  parentForm,
  validateMode = "onSubmit",
  validator = defaultValidator,
  activeFields = defaultActiveFields,
}) {
  const formObservable = observable({
    fields: {},
    parentForm,
    formDefinition: {},
    data: {},
    allFieldsShouldValidate: false,
    get touchedFields() {
      return this.fieldOrder.filter(
        (fieldname) => mobxGet(this.fields, fieldname)?.touched
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
      Object.values(this.fields).forEach((field) => {
        field.reInitialise(values);
      });
    },

    registerField(fieldDef) {
      const { name, defaultValue, helptext, placeholder } = fieldDef;
      if (formObservable.fields[name]) return formObservable.fields[name];
      const fieldObservable = observable({
        name,
        formDefinition: formObservable.formDefinition,
        get _validationResults() {
          return fromPromise.resolve(
            validator(formObservable.formDefinition, [name])
          );
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
        get isActive() {
          return activeFields(formObservable.formDefinition, [name])[name];
        },
        reInitialise(newData: { [key: string]: any }) {
          this._value = _.get(newData, name);
          this.touched = false;
        },
      });
      mobxSet(formObservable.fields, name, fieldObservable);
      return fieldObservable;
    },
  });

  return formObservable;
}

export function Form(props) {
  const {
    children,
    action,
    validateMode = "onSubmit",
    validator = defaultValidator,
    activeFields = defaultActiveFields,
  } = props;

  const parentForm = React.useContext(FormContext);
  const formObservable = React.useRef(null);
  if (formObservable.current == null)
    formObservable.current = makeFormObservable({
      parentForm,
      validateMode,
      validator,
      activeFields,
    });

  return (
    <FormContext.Provider value={formObservable}>
      <SUIForm action={action}>{children}</SUIForm>
    </FormContext.Provider>
  );
}

/*<Table selectable>
        <Table.Body>{fields}</Table.Body>
      </Table>
      <InitValuesSetter initValues={initialValues} />
      <SubmitButton />
      <ResetButton />
      <Button
        icon={cancelIcon}
        content={cancelContent}
        type="button"
        onClick={onCancel}
      /> */
