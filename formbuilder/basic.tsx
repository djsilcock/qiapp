import React from "react";
import { Input, TextArea } from "./components";
import { FormRow } from "./FormRow";
import { observer } from "mobx-react";
import { makeStringValueErrorSelector, makeComponent } from "./common";
import { FormContext } from "./Form";

export const TextComponent = observer(({ Component, fieldObservable }) => {
  return (
    <Component
      value={fieldObservable.value}
      onChange={(e, { value }) => {
        fieldObservable.value = value;
      }}
      onBlur={() => {
        fieldObservable.touched = true;
      }}
      id={fieldObservable.id}
      name={fieldObservable.name}
      {...fieldObservable.componentProps}
    />
  );
});

export function TextField(props) {
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
