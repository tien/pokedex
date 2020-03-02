import React from "react";

interface IToggleNavButtonProps {
  active: boolean;
  onClick: () => void;
}

const ToggleNavButton = (props: IToggleNavButtonProps) => (
  <div
    id="toggle-nav-button"
    className={props.active ? "active" : ""}
    onClick={props.onClick}
  >
    <div className="nav-button-bar" />
    <div className="nav-button-bar" />
    <div className="nav-button-bar" />
  </div>
);

export default ToggleNavButton;
