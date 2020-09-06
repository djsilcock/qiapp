import React from "react";
import { Input, TextArea } from "./components";
import { useFormContext, ValidationOptions } from "react-hook-form";
import { FormRow, FormRowProps } from "./FormRow";
import PropTypes from "prop-types";

interface TextComponentProps {
  multiline?: boolean;
  name: string;
  id?: string;
  placeholder?: string;
  validation?: ValidationOptions;
}

interface TAwithPrivate extends TextArea {
  ref: React.MutableRefObject<HTMLTextAreaElement>;
}
interface InputWithPrivate extends Input {
  inputRef: React.MutableRefObject<HTMLInputElement>;
}
export const TextComponent: React.FC<TextComponentProps> = ({
  multiline,
  name,
  validation,
  id,
  ...props
}) => {
  const { register } = useFormContext();
  return multiline ? (
    <TextArea
      ref={(r: TAwithPrivate) => register(r && r.ref.current, validation)}
      id={id}
      name={name}
      {...props}
    />
  ) : (
    <Input
      ref={(r: InputWithPrivate) =>
        register(r && r.inputRef.current, validation)
      }
      id={id}
      name={name}
      {...props}
    />
  );
};

export function TextField(props: TextComponentProps & FormRowProps) {
  return <FormRow component={TextComponent} {...props} />;
}

TextField.defaultProps = { defaultValue: "" };
TextField.getDefaultValue = () => {};

export function HiddenComponent({ name }) {
  const { register } = useFormContext();
  return <input ref={register} name={name} />;
}
