import React from "react";
import { RecoilState, RecoilValueReadOnly, atom, selector } from "recoil";
import { newKey } from "./Form";

function makeMinLengthStringValidator({
  get,
  valueAtom,
  defLength,
  defMsg,
}: {
  get;
  valueAtom;
  defLength?;
  defMsg?;
}) {
  return (l: number = defLength, msg: string = defMsg) => {
    const val = get(valueAtom);
    msg = msg || `Must be at least ${l} character${l == 1 ? "" : "s"}`;
    if (typeof val == "string" && val.length >= l) return true;
    throw msg;
  };
}
function makeMaxLengthStringValidator({
  get,
  valueAtom,
  defLength,
  defMsg,
}: {
  get;
  valueAtom;
  defLength?;
  defMsg?;
}) {
  return (l: number = defLength, msg: string = defMsg) => {
    const val = get(valueAtom);
    msg = msg || `Must be at most ${l} character${l == 1 ? "" : "s"}`;
    if (typeof val == "string" && val.length <= l) return true;
    throw msg;
  };
}
export function makeStringValueErrorSelector({
  valueAtom,
  formContext,
  spec: { name, validation },
}) {
  return selector({
    key: newKey(),
    get: ({ get }) => {
      const minLength = makeMinLengthStringValidator({ get, valueAtom });
      const maxLength = makeMaxLengthStringValidator({ get, valueAtom });
      try {
        if (
          validation({
            get: (field = name) => get(formContext.values[field]),
            required: (msg: string) => minLength(1, msg),
            minLength: minLength,
            maxLength: maxLength,
          })
        )
          return true;
      } catch (msg) {
        return msg;
      }
    },
  });
}

export function makeArrayValueErrorSelector({
  valueAtom,
  formContext,
  spec: { validation, name },
}) {
  return selector({
    key: newKey(),
    get: ({ get }) => {
      const minLength = (l: number, msg?: string) => {
        const val = get(valueAtom);
        msg = msg || `You must select at least ${l} option${l == 1 ? "" : "s"}`;
        if (Array.isArray(val) && val.length >= l) return true;
        throw msg;
      };
      const maxLength = (l: number, msg?: string) => {
        const val = get(valueAtom);
        msg = msg || `You must select at most ${l} option${l == 1 ? "" : "s"}`;
        if (Array.isArray(val) && val.length <= l) return true;
        throw msg;
      };
      try {
        if (
          validation({
            get: (field = name) => get(formContext.values[field]),
            required: (msg: string) => minLength(1, msg),
            minLength: minLength,
            maxLength: maxLength,
          })
        )
          return true;
      } catch (msg) {
        return msg;
      }
    },
  });
}
export function makeComponent({
  Component,
  formContext,
  spec,
  errorSelectorFactory,
  valueAtom,
}) {
  const errorSelector: RecoilValueReadOnly<
    string | false
  > = errorSelectorFactory({ valueAtom, formContext, spec });

  const displayError: RecoilValueReadOnly<string | false> = selector({
    key: newKey(),
    get: ({ get }) => get(touched) && get(errorSelector),
  });
  const touched: RecoilState<boolean> = atom({
    key: newKey(),
    default: false,
  });
  formContext.values[spec.name] = valueAtom;
  formContext.rawErrors[spec.name] = errorSelector;
  formContext.touched[spec.name] = touched;
  return (
    <Component
      value={valueAtom}
      error={displayError}
      touched={touched}
      formContext={formContext}
      {...spec}
    />
  );
}
