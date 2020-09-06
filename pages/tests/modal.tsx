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
  const modalcontroller = React.useRef();
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
    Object.assign(window, { modalcontroller, formcontroller: formContext });
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
      </Form>
      <ModalComponent controller={modalcontroller}>
        <TextField name="hello" label="Modal field" />
      </ModalComponent>
    </>
  );
}
