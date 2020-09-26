/*eslint-env jest */
import { makeFormObservable } from "./makeFormObservable";

test("creates a form", () => {
  const form = makeFormObservable();
});

test("blank form is valid", () => {
  const form = makeFormObservable();
  form.validState;
});

test("register one field", () => {
  const form = makeFormObservable();
  const field = form.registerField({
    name: "testfield",
    defaultValue: "",
    helptext: "helptext",
    placeholder: "placeholder",
  });
});
