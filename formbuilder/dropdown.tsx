import React, { useCallback, ReactNode } from "react";
import { get } from "lodash";

import { Dropdown } from "semantic-ui-react";
import { FormRow, FormRowProps } from "./FormRow";
import {
  useRecoilState,
  useRecoilValue,
  RecoilState,
  RecoilValueReadOnly,
  useRecoilCallback,
  CallbackInterface,
} from "recoil";

const _ = { get };
type DropdownOptions = [string, string];

interface DropdownFieldSpec {
  name: string;
  required?: boolean;
  label: ReactNode;
  helptext?: ReactNode;
  search?: boolean;
  placeholder?: string;
  closeOnChange?: boolean;
  multiple?: boolean;
  options: DropdownOptions[] | ((formContext: any) => DropdownOptions[]);
  validation?: (callbacks: DropdownValidationSignature) => string | boolean;
  defaultValue?: string | string[];
  addItem?(
    addition: any,
    formContext: any,
    recoil: CallbackInterface
  ): Promise<any>;
  allowNew?: boolean;
}

interface DropdownPropsCore extends DropdownFieldSpec {
  value: RecoilState<string | string[]>;
  touched: RecoilState<boolean>;
  error: RecoilValueReadOnly<string | false>;
  formContext: any;
}

interface DropdownPropsWithAdditions extends DropdownPropsCore {
  addItem(addition: any): Promise<any>;
  allowNew: true;
}

interface DropdownValidationSignature {
  get: (name: string) => any;
  required: (msg?: string) => boolean;
  minLength: (length: number, msg?: string) => boolean;
  maxLength: (length: number, msg?: string) => boolean;
}

export function DropdownComponent(props: DropdownPropsWithAdditions);
export function DropdownComponent(props: DropdownPropsCore);
export function DropdownComponent(props: any) {
  const {
    search = false,
    addItem = false,
    placeholder = "",
    closeOnChange = true,
    name,
    options: optionsArrayOrCallback,
    multiple = false,
    allowNew = false,
    value: valueAtom,
    formContext,
  } = props;
  const [value, setValue] = useRecoilState<string[]>(valueAtom);
  const options = optionsArrayOrCallback.call
    ? optionsArrayOrCallback()
    : optionsArrayOrCallback;
  const onChange = useCallback((e, { value }) => setValue(value), [setValue]);
  const renderLabel = useCallback(
    ({ text, color }) => ({ content: text, color }),
    []
  );
  const onAddItem = useRecoilCallback(
    (recoil) => async (e, { value }) => {
      try {
        const newvalue = await (addItem?.(value, formContext, recoil) ||
          Promise.resolve(value));
        if (newvalue)
          setValue(multiple ? (s) => s.concat([newvalue]) : newvalue.value);
      } finally {
      }
    },
    [setValue]
  );
  return (
    <Dropdown
      placeholder={placeholder}
      id={name}
      fluid
      search={search || false}
      selection
      options={options.map(([value, text]) => ({ value, text }))}
      allowAdditions={allowNew || false}
      multiple={multiple}
      name={name}
      onChange={onChange}
      renderLabel={renderLabel}
      onAddItem={onAddItem}
      closeOnChange={closeOnChange}
    />
  );
}

export function DropdownField(
  props: (DropdownPropsWithAdditions | DropdownPropsCore) & FormRowProps
) {
  return <FormRow component={DropdownComponent} id={props.name} {...props} />;
}
import { atom, selector } from "recoil";
import { newKey } from "./Form";
import { makeArrayValueErrorSelector, makeComponent } from "./common";

export function dropdown(spec: DropdownFieldSpec) {
  return (formContext) => makeDropdownComponent(formContext, spec);
}

function makeDropdownComponent(formContext, spec: DropdownFieldSpec) {
  const defaultValue = spec.defaultValue || (spec.multiple ? [] : "");
  if (!!spec.multiple != Array.isArray(defaultValue))
    throw "default value must (only) be an array if multiple options are enabled";

  const valueAtom: RecoilState<string | string[]> = atom({
    key: newKey(),
    default: defaultValue,
  });

  const errorSelectorFactory = makeArrayValueErrorSelector;

  return makeComponent({
    Component: DropdownField,
    formContext,
    spec,
    errorSelectorFactory,
    valueAtom,
  });
}
