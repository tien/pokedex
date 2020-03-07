import "../styles/Modal.css";

import React, { forwardRef, useCallback } from "react";

import {
  useCombinedRefs,
  useEnterKeyCallback,
  useFocusTrap
} from "../utils/hooks";

interface IModalProps {
  active: boolean;
  closeModal: () => void;
  style: any;
  children?: React.ReactNode;
}

const Modal = forwardRef<HTMLElement, IModalProps>(
  ({ active, closeModal, style, children }, ref) => {
    const modalRef = useFocusTrap(active);

    const onModalCloseButtonPress = useCallback(
      (e: React.SyntheticEvent<HTMLButtonElement>) => {
        (e.target as HTMLButtonElement).blur();
        closeModal();
      },
      [closeModal]
    );

    return (
      <section
        ref={useCombinedRefs(modalRef, ref)}
        style={style}
        id="modal"
        className={active ? "active" : ""}
      >
        <button
          id="modal-close-button"
          onClick={onModalCloseButtonPress}
          onKeyPress={useEnterKeyCallback(onModalCloseButtonPress, [])}
        >
          <svg width="100%" viewBox="0 0 70 70">
            <line
              className="modal-button-bar"
              x1={10}
              y1={10}
              x2={60}
              y2={60}
            />
            <line
              className="modal-button-bar"
              x1={60}
              y1={10}
              x2={10}
              y2={60}
            />
          </svg>
          close
        </button>
        <section id="modal-content">{children}</section>
      </section>
    );
  }
);

export default Modal;
