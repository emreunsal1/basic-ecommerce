import React from "react";

export default function CheckBoxInput({
  label = "ex1",
  value = "ex1",
  disabled = false,
  checked = false,
  name = "radio",
  onChange = () => {},
}) {
  return (
    <div onChange={(e) => onChange(e)} className="checkbox-wrapper">
      <div className="checkbox-item" key={value}>
        <input
          defaultChecked={checked | false}
          disabled={disabled}
          type="checkbox"
          name={name | "example"}
          value={value}
        />
        <label htmlFor={value}>{label}</label>
      </div>
    </div>
  );
}
