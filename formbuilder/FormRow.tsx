import React from "react";
import { FormContext } from "./Form";
import { Form, Message as Msg, Table } from "semantic-ui-react";
import { Observer, observer } from "mobx-react";

const ErrorMessage = observer(function ErrorMessage({ fieldObservable }) {
  return fieldObservable.validState == "invalid" ? (
    <Msg error visible>
      {fieldObservable.errors}
    </Msg>
  ) : null;
});

const FieldLabel = observer(function FieldLabel({ fieldObservable }) {
  return (
    <Form.Field
      required={fieldObservable.required}
      error={fieldObservable.validState == "invalid"}
    >
      <label htmlFor={fieldObservable.id}>{fieldObservable.label}</label>
    </Form.Field>
  );
});

const HelpMessage = observer(function HelpMessage({ fieldObservable }) {
  return fieldObservable.helptext ? (
    <Msg info>{`${fieldObservable.helptext}`}</Msg>
  ) : null;
});

{
}
const ComponentField = observer(function ComponentField({
  fieldObservable,
  children,
}) {
  return (
    <Form.Field error={fieldObservable.validState == "invalid"}>
      {children}
    </Form.Field>
  );
});

function FormRow({ fieldObservable, children }: any) {
  return (
    <Table.Row>
      <Table.Cell width={8}>
        <FieldLabel fieldObservable={fieldObservable} />
        <HelpMessage fieldObservable={fieldObservable} />
        <ErrorMessage fieldObservable={fieldObservable} />
      </Table.Cell>
      <Table.Cell width={8}>
        <ComponentField fieldObservable={fieldObservable}>
          {children}
        </ComponentField>
      </Table.Cell>
    </Table.Row>
  );
}

export { FormRow };
