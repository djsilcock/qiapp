/*eslint-disable react/prop-types*/
import React, { MutableRefObject, ReactNode } from "react";
import { Modal } from "semantic-ui-react";
//import PropTypes from "prop-types";
import { Form } from "./Form";

interface ModalProps {
  controller: MutableRefObject<ModalController>;
  children: ReactNode;
}
interface ModalController {
  open(vars: object): Promise<object>;
  close(): void;
}
export const ModalComponent = ({ controller, children }: ModalProps) => {
  const [modalState, setModalState] = React.useState(null);
  const resolveRef: MutableRefObject<(v: object) => void> = React.useRef();
  const rejectRef: MutableRefObject<() => void> = React.useRef();
  const defaultValues: MutableRefObject<object> = React.useRef();
  const submitModal = (values: object) => {
    setModalState(null);
    resolveRef.current(values);
  };
  const cancelModal = () => {
    setModalState(null);
    rejectRef.current();
  };
  React.useImperativeHandle(
    controller,
    (): ModalController => ({
      open: (vars: object) => {
        return new Promise((resolve, reject) => {
          defaultValues.current = vars;
          setModalState(true);
          resolveRef.current = resolve;
          rejectRef.current = reject;
        });
      },
      close: () => {
        setModalState(null);
      },
    })
  );
  return (
    modalState && (
      <Modal open={true}>
        <Form
          onSubmit={submitModal}
          onCancel={cancelModal}
          defaultValues={defaultValues.current}
        >
          {children}
        </Form>
      </Modal>
    )
  );
};
ModalComponent.displayName = "ModalComponent";
