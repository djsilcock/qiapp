import React from "react";
import { FormContext } from "./Form";
import { Form, Message as Msg, Table } from "semantic-ui-react";
import { Observer } from "mobx-react";

function ErrorMessage({ name }) {
  const formContext = React.useContext(FormContext);
  return (
    <Observer>
      {() => {
        const field = formContext.fields[name];
        return field.validState == "invalid" ? (
          <Msg error visible>
            {field.errors}
          </Msg>
        ) : null;
      }}
    </Observer>
  );
}

function FormRow({
  component: Component,
  registerField,
  label,
  id,
  name,
  helptext,
  children,
  errorMessage,
  required = false,
  ...componentprops
}: any) {
  id = id || `${name}-control`;
  Object.assign(componentprops, { name, id });

  return (
    <Table.Row>
      <Table.Cell width={8}>
        <Form.Field required={required} error={!!errorMessage}>
          <label htmlFor={id}>{label}</label>
        </Form.Field>
        {helptext ? <Msg info>{`${helptext}`}</Msg> : null}
        <ErrorMessage></ErrorMessage>
      </Table.Cell>
      <Table.Cell width={8}>
        <Form.Field error={!!errorMessage}>
          {Component ? (
            <Component value={value} {...componentprops} />
          ) : (
            children
          )}
        </Form.Field>
      </Table.Cell>
    </Table.Row>
  );
}

export { FormRow };
