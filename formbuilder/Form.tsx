import React from "react";
import { Form as SUIForm } from "semantic-ui-react";

import { makeFormObservable } from "./makeFormObservable";

export const FormContext = React.createContext(null);
export function Form(props) {
  const { children, action, validateMode = "onSubmit" } = props;

  const parentForm = React.useContext(FormContext);
  const formObservable = React.useRef(null);
  if (formObservable.current == null)
    formObservable.current = makeFormObservable({
      parentForm,
      validateMode,
    });

  return (
    <FormContext.Provider value={formObservable}>
      <SUIForm action={action}>{children}</SUIForm>
    </FormContext.Provider>
  );
}

/*<Table selectable>
        <Table.Body>{fields}</Table.Body>
      </Table>
      <InitValuesSetter initValues={initialValues} />
      <SubmitButton />
      <ResetButton />
      <Button
        icon={cancelIcon}
        content={cancelContent}
        type="button"
        onClick={onCancel}
      /> */
