//TODO: validation

import React from "react";
import { chunk } from "lodash";
import { Grid } from "semantic-ui-react";
import PropTypes from "prop-types";
import { FormRow, FormRowProps } from "./FormRow";
import { useRecoilState, RecoilState } from "recoil";

interface CheckboxRadioProps {
  options: Array<[string, string]>;
  name: string;
  type: "checkbox" | "radio";
  value: RecoilState<string | string[]>;
}

interface BaseCheckboxProps extends CheckboxRadioProps {
  numCols: 1 | 2 | 3 | 4 | 5;
}
export function BaseCheckboxComponent(props: BaseCheckboxProps): any;
export function BaseCheckboxComponent({
  numCols,
  options,
  name,
  type,
  value: valueAtom,
}) {
  const [valueRaw, setValue] = useRecoilState(valueAtom);
  const value = Array.isArray(valueRaw)
    ? new Set(valueRaw)
    : new Set([valueRaw]);
  var buttons = options.map(([val, btnlabel]) => (
    <div key={val}>
      <div className={type == "radio" ? "ui radio checkbox" : "ui checkbox"}>
        <input
          type={type}
          checked={value.has(val)}
          onChange={(evt) => {
            const checked = evt.target.checked;
            if (type == "radio" && checked) return setValue(val);
            setValue((vals: string[]) => {
              const s = new Set(vals);
              checked ? s.add(val) : s.delete(val);
              return Array.from(s);
            });
          }}
          id={`${name}-${val}`}
          name={name}
          value={val}
        />
        <label htmlFor={`${name}-${val}`}>{btnlabel}</label>
      </div>
    </div>
  ));
  const colLength = Math.ceil(buttons.length / numCols);
  const cols = chunk(buttons, colLength).map((column, idx) => (
    <Grid.Column key={idx}>{column}</Grid.Column>
  ));
  return (
    <>
      <select name={name}></select>
      <Grid stackable columns={numCols}>
        {cols}
      </Grid>
    </>
  );
}

export function RadioComponent(props: CheckboxRadioProps) {
  return <BaseCheckboxComponent type="radio" numCols={1} {...props} />;
}
export function CheckboxComponent(props: CheckboxRadioProps) {
  return <BaseCheckboxComponent type="checkbox" numCols={2} {...props} />;
}

interface CheckboxRadioFieldProps extends CheckboxRadioProps, FormRowProps {}
export function RadioField(props: CheckboxRadioFieldProps) {
  return <FormRow component={RadioComponent} {...props} />;
}

export function CheckboxField(props: CheckboxRadioFieldProps) {
  return <FormRow component={CheckboxComponent} {...props} />;
}
