import React from "react";
import { Input, TextArea } from "./components";
import { FormRow, FormRowProps } from "./FormRow";
import {
  useRecoilState,
  useRecoilValue,
  RecoilState,
  atom,
  useSetRecoilState,
} from "recoil";
import { newKey } from "./Form";
import { makeStringValueErrorSelector, makeComponent } from "./common";

interface TextComponentProps {
  multiline?: boolean;
  name: string;
  id?: string;
  placeholder?: string;
  value: RecoilState<any>;
  touched: RecoilState<boolean>;
  Component: Input | TextArea;
}

export const TextComponent = ({
  Component,
  name,
  id,
  value: valueAtom,
  touched,
  ...props
}) => {
  const [value, setValue] = useRecoilState(valueAtom);
  const setTouched = useSetRecoilState(touched);
  return (
    <Component
      value={value}
      onChange={(e, { value }) => setValue(value)}
      onBlur={() => setTouched(true)}
      id={id}
      name={name}
      {...props}
    />
  );
};

export function TextField(props: TextComponentProps & FormRowProps) {
  return <FormRow component={TextComponent} {...props} />;
}

export function HiddenComponent({ name, value: valueAtom }) {
  const value: string = useRecoilValue(valueAtom);
  return <input type="hidden" value={value} name={name} />;
}
export function HiddenField(props) {
  return <FormRow component={HiddenComponent} {...props} />;
}

export function text(spec) {
  return (formContext) =>
    makeTextComponent(TextField, formContext, { Component: Input, ...spec });
}
export function textarea(spec) {
  return (formContext) =>
    makeTextComponent(TextField, formContext, { Component: TextArea, ...spec });
}

function makeTextComponent(Component, formContext, spec) {
  const defaultValue = spec.defaultValue || (spec.multiple ? [] : "");

  const valueAtom: RecoilState<string> = atom({
    key: newKey(),
    default: defaultValue,
  });

  const errorSelectorFactory = makeStringValueErrorSelector;
  return makeComponent({
    Component,
    formContext,
    spec,
    errorSelectorFactory,
    valueAtom,
  });
}
