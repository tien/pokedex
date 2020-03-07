import React from "react";
import { useEnterKeyCallback } from "../../utils/hooks";

interface IToggleNavButtonProps {
  active: boolean;
  onClick: () => void;
}

const ToggleNavButton = ({ active, onClick }: IToggleNavButtonProps) => (
  <div
    id="toggle-nav-button"
    role="button"
    tabIndex={0}
    className={active ? "active" : ""}
    onClick={onClick}
    onKeyPress={useEnterKeyCallback(onClick, [onClick])}
  >
    <div className="nav-button-bar" />
    <div className="nav-button-bar" />
    <div className="nav-button-bar" />
  </div>
);

export default ToggleNavButton;
