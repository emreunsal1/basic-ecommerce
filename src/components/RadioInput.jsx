import React from "react";

export default function RadioInput({
  label = "ex1",
  value = "ex1",
  disabled = false,
  checked = false,
  onChange = () => {},
  name,
}) {
  return (
    <div className="radio-input-wrapper">
      <div className="radio-item" key={value}>
        <input
          onChange={(e) => onChange(e)}
          defaultChecked={checked | false}
          disabled={disabled}
          type="radio"
          name={name | "example"}
          value={value}
        />
        <label htmlFor={value}>{label}</label>
      </div>
    </div>
  );
}
