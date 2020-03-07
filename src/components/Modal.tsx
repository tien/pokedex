import "../styles/Modal.css";

import React, { forwardRef, useCallback, useRef } from "react";

import {
  useCombinedRefs,
  useDocumentKeyBoardEffect,
  useEnterKeyCallback,
  usePressedKey
} from "../utils/hooks";

interface IModalProps {
  active: boolean;
  closeModal: () => void;
  style: any;
  children?: React.ReactNode;
}

const Modal = forwardRef<HTMLElement, IModalProps>(
  ({ active, closeModal, style, children }, ref) => {
    const modalRef = useRef<HTMLElement>(null);

    const [pressedKeys] = usePressedKey();

    const onModalCloseButtonPress = useCallback(
      (e: React.SyntheticEvent<HTMLButtonElement>) => {
        (e.target as HTMLButtonElement).blur();
        closeModal();
      },
      [closeModal]
    );

    useDocumentKeyBoardEffect(
      "keydown",
      "Tab",
      e => {
        if (!active) {
          return;
        }

        const focusables: NodeListOf<HTMLElement> =
          modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          ) ?? (new NodeList() as NodeListOf<HTMLElement>);

        if (focusables.length === 0) {
          return;
        }

        const firstFocusableElement = focusables[0];
        const lastFocusableElement = focusables[focusables.length - 1];

        const hasFocusedElement = Array.from(focusables).some(
          element => element === document.activeElement
        );

        if (
          !hasFocusedElement ||
          lastFocusableElement === document.activeElement
        ) {
          e.preventDefault();
          firstFocusableElement.focus();
        } else if (
          pressedKeys.includes("Shift") &&
          firstFocusableElement === document.activeElement
        ) {
          e.preventDefault();
          lastFocusableElement.focus();
        }
      },
      [active]
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
