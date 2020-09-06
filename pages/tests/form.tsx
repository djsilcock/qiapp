import {
  Form,
  TextField,
  CheckboxField,
  RadioField,
  DropdownField,
  DatePickerField,
  //  ArrayPopupField,
  ModalComponent,
} from "../../src";
import React from "react";
import { useForm } from "react-hook-form";
export default function TestForm() {
  const formContext = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {},
    validationSchema: undefined, // Note: will be deprecated in the next major version with validationResolver
    validationResolver: undefined,
    validationContext: undefined,
    validateCriteriaMode: "firstError",
    submitFocusError: true,
  });
  React.useEffect(() => {
    Object.assign(window, { formcontroller: formContext });
  }, []);

  return (
    <>
      <Form
        onSubmit={(values) => {
          Object.assign(window, { formvalues: values });
        }}
        onCancel={() => {
          Object.assign(window, { cancelled: true });
        }}
        formContext={formContext}
        submitContent="Submit"
        submitIcon="check"
        cancelContent="Cancel"
        cancelIcon="cancel"
        resetContent="Reset"
        resetIcon="undo"
        action=""
      >
        <TextField label="single input" name="singleinput" />
        <TextField
          label="multiple input"
          multiline
          name="multipleinput"
          validation={{
            minLength: { value: 4, message: "Must be at least 4 characters" },
          }}
        />
        <CheckboxField
          label="checkbox"
          name="checkboxfield"
          options={[
            ["opt1", "CB Option 1"],
            ["opt2", "CB Option 2"],
          ]}
          validation={{
            minLength: { value: 1, message: "Must have at least 1 selected" },
          }}
        />
        <RadioField
          label="radio buttons"
          name="radiofield"
          options={[
            ["opt1", "Radio Option 1"],
            ["opt2", "Radio Option 2"],
          ]}
        />
        <DatePickerField label="date field" name="datefield" />
        <DropdownField
          label="single dropdown"
          name="singledropdown"
          options={[
            ["opt1", "SD Option 1"],
            ["opt2", "SD Option 2"],
          ]}
        />
        <DropdownField
          label="multiple dropdown"
          name="multidropdown"
          multiple
          options={[
            ["opt1", "MD Option 1"],
            ["opt2", "MD Option 2"],
          ]}
        />
      </Form>
    </>
  );
}
