import React from "react";
import classNames from "classnames";

const SIZE = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
};

export default function Button({
  children,
  disabled = false,
  size = SIZE.MEDIUM,
  onClick = () => {},
}) {
  const buttonClassName = classNames("button", size, { disabled: disabled });
  return (
    <div className={buttonClassName} onClick={() => onClick()}>
      {children}
    </div>
  );
}
