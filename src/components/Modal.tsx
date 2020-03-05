import React, { forwardRef } from "react";
import "../styles/Modal.css";

interface IModalProps {
  children?: React.ReactNode;
  active: boolean;
  closeModal: () => void;
  style: any;
}

const Modal = forwardRef<HTMLDivElement, IModalProps>((props, ref) => (
  <div
    ref={ref}
    style={props.style}
    id="modal"
    className={props.active ? "active" : ""}
  >
    <div id="modal-close-button" onClick={props.closeModal}>
      <div className="modal-button-bar" />
      <div className="modal-button-bar" />
    </div>
    <div id="modal-content">{props.children}</div>
  </div>
));

export default Modal;
