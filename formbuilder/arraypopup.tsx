/*eslint-disable react/prop-types*/
import React from "react";
import { Button } from "./components";
import { FormRow } from "./FormRow";
import { useFieldArray, useFormContext } from "react-hook-form";
export function ArrayPopupComponent({
  name,
  summary,
  canAdd,
  onAddItem,
  onEditItem,
}) {
  const editFunc = React.useCallback(
    (values) => {
      if (onEditItem) return onEditItem(values);
    },
    [onEditItem]
  );
  const addFunc = React.useCallback(() => {
    if (onAddItem) return onAddItem();
    return editFunc({});
  }, [onAddItem]);
  const arrayhelpers = useFieldArray({ name });
  const formContext = useFormContext();
  return (
    <>
      {arrayhelpers.fields.map((value, index) =>
        summary({
          value,
          remove: () => arrayhelpers.remove(index),
          popup: () => {
            editFunc(value)
              .then((v) => formContext.setValue(`${name}[${index}]`, v))
              .catch(() => {
                return;
              });
          },
        })
      )}
      {canAdd ? (
        <div>
          <Button
            icon="add"
            type="button"
            as="a"
            onClick={(evt) => {
              evt.preventDefault();
              addFunc()
                .then(arrayhelpers.append)
                .catch(() => {
                  return;
                });
            }}
          />
        </div>
      ) : null}
    </>
  );
}
export function ArrayPopupField(props) {
  return <FormRow component={ArrayPopupComponent} {...props} />;
}
