/*seslint-disable react/prop-types*/
import React, { ReactNode } from "react";
import { DateInput } from "semantic-ui-calendar-react";
import { Controller, ValidationOptions } from "react-hook-form";
import { FormRow, FormRowProps } from "./FormRow";
import PropTypes from "prop-types";

interface DatePickerProps {
  name: string;
  placeholder?: ReactNode;
  validation?: ValidationOptions;
}

export function DatePickerComponent({
  name,
  placeholder,
  validation,
}: DatePickerProps) {
  return (
    <Controller
      as={
        <DateInput
          id={name}
          placeholder={placeholder}
          iconPosition="left"
          value=""
          onChange={() => {}}
        />
      }
      name={name}
      // eslint-disable-next-line no-unused-vars
      onChange={([e, props]) => {
        return props?.value;
      }}
      rules={validation}
    />
  );
}

interface DatePickerFieldProps extends FormRowProps, DatePickerProps {}
export function DatePickerField(props: DatePickerFieldProps) {
  return <FormRow component={DatePickerComponent} id={props.name} {...props} />;
}
DatePickerField.getDefaultValue = () => "";
