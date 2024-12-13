import classNames from "classnames";
import React from "react";

export default function HeaderMenuItem({ logo, content, className }) {
  const headerMenuItemClassname = classNames("menu-item", className);
  return (
    <div className={headerMenuItemClassname}>
      <div className="menu-item-logo">
        <img src={logo} />
      </div>
      <div className="menu-item-content">{content}</div>
    </div>
  );
}
