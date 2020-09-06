import React, {
  JSXElementConstructor,
  ReactNode,
  ReactElement,
  ReactNodeArray,
} from "react";
import PropTypes from "prop-types";
import { Form, Message as Msg, Table } from "semantic-ui-react";
import { useFormContext } from "react-hook-form";
import { get } from "lodash";

import { ValidationOptions } from "react-hook-form";

export interface FormRowProps {
  name: string;
  id?: string;
  required?: boolean;
  label: ReactNode;
  helptext?: ReactNode;
  validation?: ValidationOptions;
}
interface FormRowComponentProps extends FormRowProps {
  component: JSXElementConstructor<any>;
}
interface FormRowChildrenProps extends FormRowProps {
  children: ReactNode;
}

const FormRow: React.FC<FormRowChildrenProps | FormRowComponentProps> = ({
  component: Component,
  label,
  id,
  name,
  helptext,
  children,
  required = false,
  validation = {},
  ...componentprops
}: any) => {
  const formContext = useFormContext();
  const errorMessage = get(formContext.errors, name, null);
  if (required || validation.required) {
    required = true;
    validation.required = true;
  }
  id = id || `${name}-control`;
  Object.assign(componentprops, { name, id, validation });

  return (
    <Table.Row>
      <Table.Cell width={8}>
        <Form.Field required={required} error={!!errorMessage}>
          <label htmlFor={id}>{label}</label>
        </Form.Field>
        {helptext ? <Msg info>{`${helptext}`}</Msg> : null}
        {errorMessage && (
          <Msg error visible>
            {errorMessage.message || "Please check your response here"}
          </Msg>
        )}
      </Table.Cell>
      <Table.Cell width={8}>
        <Form.Field error={!!errorMessage}>
          {Component ? <Component {...componentprops} /> : children}
        </Form.Field>
      </Table.Cell>
    </Table.Row>
  );
};

FormRow.displayName = "FormRow";

export { FormRow };
