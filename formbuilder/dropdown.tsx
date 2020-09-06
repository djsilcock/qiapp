import React, { useCallback, JSXElementConstructor } from "react";
import { get } from "lodash";

import { Dropdown } from "semantic-ui-react";
import { useFormContext, Controller, ValidationOptions } from "react-hook-form";
import PropTypes from "prop-types";
import { FormRow, FormRowProps } from "./FormRow";

type DropdownOptions = [string, string];
interface DropdownPropsCore extends FormRowProps {
  search?: boolean;
  placeholder?: string;
  closeOnChange?: boolean;
  name: string;
  multiple?: boolean;
  options: DropdownOptions[];
  validation?: ValidationOptions;
}

interface DropdownPropsWithAdditions extends DropdownPropsCore {
  addItem(addition: any): Promise<any>;
  allowNew: true;
}
export function DropdownComponent(props: DropdownPropsWithAdditions);
export function DropdownComponent(props: DropdownPropsCore);
export function DropdownComponent(props: any) {
  const {
    search = false,
    addItem = false,
    placeholder = "",
    closeOnChange = true,
    name,
    options,
    multiple = false,
    allowNew = false,
    validation = {},
  } = props;
  const formctx = useFormContext();
  // eslint-disable-next-line no-unused-vars
  const onChange = useCallback(([e, { value }]) => value, []);
  const renderLabel = useCallback(
    ({ text, color }) => ({ content: text, color }),
    []
  );
  const onAddItem = useCallback(
    async (e, { value }) => {
      try {
        const newvalue = await (addItem?.(value) || Promise.resolve(value));
        if (newvalue)
          formctx.setValue(
            name,
            multiple
              ? formctx.getValues(name).concat([newvalue])
              : newvalue.value
          );
      } finally {
      }
    },
    [formctx]
  );
  return (
    <Controller
      as={Dropdown}
      control={formctx.control}
      placeholder={placeholder}
      id={name}
      fluid
      search={search || false}
      selection
      options={options.map(([value, text]) => ({ value, text }))}
      allowAdditions={allowNew || false}
      multiple={multiple}
      name={name}
      error={!!get(formctx.errors, name)}
      onChange={onChange}
      renderLabel={renderLabel}
      onAddItem={onAddItem}
      rules={validation}
      closeOnChange={closeOnChange}
    />
  );
}

export function DropdownField(
  props: (DropdownPropsWithAdditions | DropdownPropsCore) & FormRowProps
) {
  return <FormRow component={DropdownComponent} id={props.name} {...props} />;
}
