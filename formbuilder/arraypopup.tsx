/*eslint-disable react/prop-types*/
import React, { ReactNode, useState } from "react";
import { Button } from "./components";
import { FormRow } from "./FormRow";
import { useRecoilState, RecoilState } from "recoil";

interface ArrayPopupComponentProps {
  name: string;
  summary: (value: any) => ReactNode;
  canAdd: Boolean;
  onAddItem: () => Promise<any>;
  value: RecoilState<any[]>;
  onEditItem: (value: any) => Promise<any>;
}

export function ArrayPopupComponent({
  name,
  summary,
  canAdd,
  onAddItem,
  value: valueAtom,
  valueKeysAtom,
  valueAtomFamily,
  onEditItem,
  modalForm,
  getKeyFromValue = (value) => value.key,
}: ArrayPopupComponentProps) {
  const [values, setValue] = useRecoilState(valueAtom);
  const [valueKeys, setValueKeys] = useRecoilState(valueKeysAtom);
  const [editingState, setEditingState] = useState(null);
  return (
    <>
      {values.map((value, index) =>
        <>summary({
          value,
          remove: () =>
            setValueKeys((keys) =>
              keys.slice(0, index).concat(keys.slice(index + 1))
            ),
          popup: () => setEditingState(getKeyFromValue(value)),
        })
        </>
      )}
      {canAdd ? (
        <div>
          <Button
            icon="add"
            type="button"
            as="a"
            onClick={(evt) => {
              setComponentState(["adding"]);
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
