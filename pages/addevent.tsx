/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from "react";
import { Button } from "semantic-ui-react";
import { Form } from "../formbuilder";
import { useRouter } from "next/router";
import {
  atom,
  atomFamily,
  selector,
  useRecoilValue,
  RecoilValueReadOnly,
  RecoilState,
} from "recoil";
import taglist from "../data-access/taglist";
import { dropdown } from "../formbuilder/dropdown";

//mocks for other field types

const text = (def) => null;
const textarea = (def) => null;
const datepicker = (def) => null;
const arraypopup = (def) => null;
const modal = (def) => null;
const hidden = (def) => null;
const checkbox = (def) => null;
const radio = (def) => null;

interface StaffMember {
  id: string;
  realName: string;
  category: string;
}

var ids = 0;
async function getNewId() {
  return "----" + ids++;
}

async function addPerson(item, ctx, recoil) {
  try {
    const newitem = await new Promise((resolve, reject) => {
      recoil.set(ctx.modalQueue, (modalQueue) =>
        modalQueue.concat([
          {
            name: "people_popup",
            vars: getNewId().then((newid) => ({
              realName: item,
              id: newid,
              category: "",
            })),
            onSubmit: resolve,
            onCancel: reject,
          },
        ])
      );
    });
    recoil.set(ctx.values["people.new"], (addedppl: any[]) =>
      addedppl.concat([newitem])
    );
    return newitem.id;
  } catch {
    return;
  }
}

const addUserForm = [
  text({
    name: "realName",
    type: "text",
    label: "Full name",
    placeholder: "Name",
    required: true,
    validation: ({ required }) => required(),
    defaultValue: "",
  }),
  hidden({
    name: "id",
    type: "hidden",
    defaultvalue: "",
  }),
  radio({
    name: "category",
    type: "radio",
    label: "Job role",
    options: Object.entries({
      MS: "Medical student",
      AA: "Anaesthesia Associate",
      NS: "Nurse",
      FY: "FY1/FY2",
      CT: "CT1-2",
      ACCS: "ACCS",
      Inter: "ST3-4",
      Higher: "ST5-7",
      SAS: "Staff grade",
      Con: "Consultant",
      Oth: "Other",
    }),
    validation: ({ required }) => required(),
    defaultValue: "",
  }),
];

const addActionPointForm = [
  /*{
    name: "_",
    validation: Yup.object().shape({
      dates: Yup.object().shape({
        finish: Yup.date().min(
          Yup.ref("start"),
          "Finish date must be later than start date"
        ),
      }),
    }),
  },*/
  (formContext) => {
    const usersSelector: RecoilValueReadOnly<StaffMember[]> = selector({
      key: "staffmember-apiquery-selector",
      get: () => [],
    });
    const availablePeopleSelector: RecoilValueReadOnly<any[]> = selector({
      key: "addeventform-availablepeople",
      get: ({ get }) =>
        get(usersSelector).concat(get(formContext.values["people.new"])),
    });
    Object.assign(formContext, {
      usersSelector,
      availablePeopleSelector,
    });
  },
  text({
    name: "title",
    type: "text",
    label: "Title",
    placeholder: "Action Point Title",
    required: true,
    validation: ({ required }) => required(),
    defaultvalue: "",
  }),
  datepicker({
    name: "dates.proposed",
    type: "datepicker",
    label: "Creation date:",
    required: true,
    validation: ({ required }) => required(),
    defaultValue: new Date().toISOString(),
  }),
  modal({
    name: "people_popup",
    type: "modal",
    formdef: addUserForm,
  }),

  arraypopup({
    name: "people.new",
    type: "arraypopup",
    modalForm: "people_popup",
    label: "Register these people as users:",
    canAdd: false,
    //eslint-disable-next-line react/display-name,react/prop-types
    summary: ({ popup, remove, value }) => {
      return (
        <div>
          {" "}
          <Button size="mini" icon="pencil" onClick={popup} />
          <Button size="mini" icon="user delete" onClick={remove} />
          {value}{" "}
        </div>
      );
    },
  }),
  textarea({
    name: "description",
    type: "textarea",
    label: "Problem to be addressed",
    placeholder: "Enter description of project here",
    required: true,
    validation: ({ required }) => required(),
    defaultValue: "",
  }),

  textarea({
    name: "methodology",
    type: "textarea",
    label: "Planned improvement:",
    placeholder: "Brief description of planned improvement",
    required: true,
    validation: ({ required }) => required(),
    defaultValue: "",
  }),
  checkbox({
    name: "category",
    type: "checkbox",
    options: Object.entries(taglist),
    label: "Tags",
    required: true,
    validation: ({ required }) => required(),
    defaultValue: [],
  }),

  dropdown({
    name: "people.involved",
    multiple: true,
    label: "People responsible",
    addItem: addPerson,
    options: (formContext) =>
      (useRecoilValue(
        formContext.availablePeopleSelector
      ) as StaffMember[]).map((v) => [v.id, v.realName]),
    search: true,
    allowNew: true,
    helptext: "Leave blank if you want somebody to volunteer",
    defaultValue: [],
  }),
  datepicker({
    type: "datepicker",
    name: "nextUpdate",
    label: "Expected next update:",
    required: true,
    validation: ({ required }) => required(),
    defaultvalue: "",
  }),
];

const addEventForm = [
  /*{
    name: "_",
    validation: Yup.object().shape({
      dates: Yup.object().shape({
        finish: Yup.date().min(
          Yup.ref("start"),
          "Finish date must be later than start date"
        ),
      }),
    }),
    //validation: { "Finish date must be later than start date": (values) => (values.dates.start < values.dates.finish) }
  },*/
  (formContext) => {
    const usersSelector: RecoilValueReadOnly<StaffMember[]> = selector({
      key: "staffmember-apiquery-selector",
      get: () => [],
    });
    const availablePeopleSelector: RecoilValueReadOnly<any[]> = selector({
      key: "addeventform-availablepeople",
      get: ({ get }) =>
        get(usersSelector).concat(get(formContext.values["people.new"])),
    });
    Object.assign(formContext, {
      usersSelector,
      availablePeopleSelector,
    });
  },
  hidden({
    name: "id",
    type: "hidden",
    defaultvalue: "",
  }),
  hidden({
    name: "rev",
    type: "hidden",
    defaultvalue: "",
  }),
  text({
    name: "title",
    type: "text",
    label: "Event Title",
    placeholder: "Event Title",
    required: true,
    validation: ({ required }) => required(),
    defaultvalue: "",
  }),
  modal({
    name: "people_popup",
    type: "modal",
    formdef: addUserForm,
  }),
  modal({
    name: "actionpoint_popup",
    type: "modal",
    formdef: addActionPointForm,
  }),
  dropdown({
    name: "people.proposers",
    multiple: true,
    label: "Reported by",
    addItem: addPerson,
    allowNew: true,
    required: true,
    search: true,
    options: (formContext) =>
      useRecoilValue(formContext.availablePeopleSelector),
    validation: ({ required }) => required(),
    defaultValue: [],
  }),
  datepicker({
    name: "eventDate",
    type: "datepicker",
    label: "Date of event",
    required: true,
    validation: ({ required }) => required(),
    defaultvalue: "",
  }),
  arraypopup({
    name: "people.new",
    type: "arraypopup",
    modalForm: "people_popup",
    label: "Register these people as users:",
    //eslint-disable-next-line react/display-name,react/prop-types
    summary: ({ popup, remove, value }) => {
      return (
        <div>
          <Button size="mini" icon="pencil" onClick={popup} />
          <Button size="mini" icon="user delete" onClick={remove} />
          {`${value.realName}(${value.category})`}
        </div>
      );
    },
    defaultValue: [],
    //displayif: ({ values }) => values.people?.new?.length > 0,
  }),
  textarea({
    name: "description",
    type: "textarea",
    label: "Description of the event",
    placeholder: "Enter description of project here",
    required: true,
    validation: ({ required }) => required(),
    defaultvalue: "",
  }),
  textarea({
    name: "triumphs",
    type: "textarea",
    label: "What went well?",
    placeholder: "Triumphs",
    required: true,
    validation: ({ required }) => required(),
    defaultvalue: "",
  }),
  textarea({
    name: "challenges",
    type: "textarea",
    label: "What could have gone better?",
    placeholder: "Challenges",
    required: true,
    validation: ({ required }) => required(),
    defaultvalue: "",
  }),
  textarea({
    name: "suggestions",
    type: "textarea",
    label: "Suggestions for future events?",
    placeholder: "Suggestions",
    required: true,
    validation: ({ required }) => required(),
    defaultvalue: "",
  }),
  arraypopup({
    name: "actionPoints",
    type: "arraypopup",
    modalForm: "actionpoint_popup",
    label: "Action Points:",
    addButton: true,
    controlFlow: async ({ ctx, index, value, popup }) => {
      const newnames = ctx.values.people.new;
      var newvalues = Object.assign({}, value);
      newvalues.people.new = newnames;
      newvalues = await popup(newvalues);
      ctx.setFieldValue("people.new", newvalues.people.new);
      newvalues.people.new = [];
      return newvalues;
    },
    //eslint-disable-next-line react/display-name,react/prop-types
    summary: ({ popup, remove, value }) => {
      return (
        <div>
          {" "}
          <Button size="mini" icon="pencil" onClick={popup} />
          <Button size="mini" icon="user delete" onClick={remove} />
          {value}{" "}
        </div>
      );
    },
    defaultvalue: [],
  }),

  checkbox({
    name: "category",
    type: "checkbox",
    options: Object.entries(taglist),
    label: "Areas covered",
    required: true,
    validation: ({ required }) => required(),
    defaultvalue: [],
  }),
  text({
    name: "othertags",
    type: "text",
    displayif: (values) => values?.category?.includes?.("other"),
    label: "Other areas covered",
    placeholder: "Other areas covered",
    required: true,
    validation: ({ required }) => required(),
    defaultvalue: "",
  }),
  arraypopup({
    name: "people.new",
    type: "arraypopup",
    modalForm: "people_popup",
    label: "Register these people as users:",
    //eslint-disable-next-line react/display-name,react/prop-types
    summary: ({ popup, remove, value }) => {
      return (
        <div>
          <Button size="mini" icon="pencil" onClick={popup} />
          <Button size="mini" icon="user delete" onClick={remove} />
          {value}
        </div>
      );
    },
    defaultvalue: [],
  }),
];

function ProjectInfoForm() {
  const router = useRouter();
  const isCompleted = useRef(false);

  useEffect(() => {
    if (isCompleted.current) router.push("/");
  });

  const formdef = addEventForm;
  const initialStatus = {};
  var initialvalues = undefined;

  const handleSubmit = async (values) => {
    const result = await fetch("/api/rest/event/add", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (result.ok) router.push("/");
  };
  const handleClose = () => {
    isCompleted.current = true;
  };
  return (
    <div>
      <h2>Event information</h2>
      <div>
        <Form
          formname="addproject"
          onSubmit={handleSubmit}
          onCancel={handleClose}
          initialValues={initialvalues}
          initialStatus={initialStatus}
          formdef={formdef}
        />
      </div>
      <hr />
    </div>
  );
}
export default ProjectInfoForm;
