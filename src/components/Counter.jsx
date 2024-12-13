import React from "react";

function Counter({ count = 0, onChange = () => {} }) {
  return (
    <div className="counter">
      <div className="counter-action" onClick={() => onChange(count - 1)}>
        -
      </div>
      <div className="counter-number">{count}</div>
      <div className="counter-action" onClick={() => onChange(count + 1)}>
        +
      </div>
    </div>
  );
}

export default Counter;
