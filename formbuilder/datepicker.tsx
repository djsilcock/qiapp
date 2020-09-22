/*seslint-disable react/prop-types*/
import React, { ReactNode } from "react";
import { DateInput } from "semantic-ui-calendar-react";
import { FormRow, FormRowProps } from "./FormRow";
import { RecoilState, useRecoilState } from "recoil";

interface DatePickerProps {
  name: string;
  placeholder?: ReactNode;
  value: RecoilState<string>;
}

export function DatePickerComponent({
  name,
  placeholder,
  value: valueAtom,
}: DatePickerProps) {
  const [value, setValue] = useRecoilState(valueAtom);
  return (
    <DateInput
      id={name}
      placeholder={placeholder}
      iconPosition="left"
      value={value}
      onChange={(e, { value }) => {
        setValue(value);
      }}
      name={name}
    />
  );
}

interface DatePickerFieldProps extends FormRowProps, DatePickerProps {}
export function DatePickerField(props: DatePickerFieldProps) {
  return <FormRow component={DatePickerComponent} id={props.name} {...props} />;
}
