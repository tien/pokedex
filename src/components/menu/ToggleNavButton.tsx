import * as React from "react";

interface IToggleNavButtonProps {
  active: boolean;
  onCLick: () => void;
}

const ToggleNavButton = (props: IToggleNavButtonProps) => (
  <div
    id="toggle-nav-button"
    className={props.active ? "active" : ""}
    onClick={props.onCLick}>
    <div className="nav-button-bar" />
    <div className="nav-button-bar" />
    <div className="nav-button-bar" />
  </div>
);

export default ToggleNavButton;
