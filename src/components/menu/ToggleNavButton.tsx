import React from "react";

interface IToggleNavButtonProps {
  active: boolean;
  onClick: () => void;
}

const ToggleNavButton = ({ active, onClick }: IToggleNavButtonProps) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus
  <div
    id="toggle-nav-button"
    role="button"
    className={active ? "active" : ""}
    onClick={onClick}
  >
    <div className="nav-button-bar" />
    <div className="nav-button-bar" />
    <div className="nav-button-bar" />
  </div>
);

export default ToggleNavButton;
