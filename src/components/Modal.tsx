import "../styles/Modal.css";

import React, { forwardRef, useCallback, useLayoutEffect, useRef } from "react";

import { useEnterKeyCallback } from "../utils/hooks";

interface IModalProps {
  active: boolean;
  closeModal: () => void;
  style: any;
  children?: React.ReactNode;
}

const Modal = forwardRef<HTMLElement, IModalProps>(
  ({ active, closeModal, style, children }, ref) => {
    const firstElementRef = useRef<HTMLDivElement>(null);

    const onModalCloseButtonPress = useCallback(
      (e: React.SyntheticEvent<HTMLButtonElement>) => {
        (e.target as HTMLButtonElement).blur();
        closeModal();
      },
      [closeModal]
    );

    const onFirstElementFocus = useCallback<
      React.FocusEventHandler<HTMLDivElement>
    >(e => e.target.blur(), []);

    const onLastElementFocus = useCallback(
      _ => firstElementRef.current?.focus(),
      []
    );

    useLayoutEffect(() => {
      firstElementRef.current?.focus();
    }, [active]);

    return (
      <section
        ref={ref}
        style={style}
        id="modal"
        className={active ? "active" : ""}
      >
        {/* Focus trap start */}
        <div
          ref={firstElementRef}
          tabIndex={-1}
          onFocus={onFirstElementFocus}
        />

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

        {/* Focus trap end */}
        <div tabIndex={active ? 0 : -1} onFocus={onLastElementFocus} />
      </section>
    );
  }
);

export default Modal;
