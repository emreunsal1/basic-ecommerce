import React from "react";
import RadioInput from "./RadioInput";
import { useSearchContext } from "../context/searchContext";

const SELECTABLE_ARRAY = [
  { label: "Old to new", value: "OLD_TO_NEW", checked: true },
  { label: "New to old", value: "NEW_TO_OLD" },
  { label: "Price high to low", value: "PRICE_HIGH_TO_LOW" },
  { label: "Price low to high", value: "PRICE_LOW_TO_HIGH" },
];

export default function SortCard() {
  const { setSortType } = useSearchContext();
  const radioButtonOnChangeHandler = (e) => {
    setSortType(e.target.value);
  };
  return (
    <div className="sort-card-wrapper">
      <div className="title">Sort by</div>
      <div className="content">
        {SELECTABLE_ARRAY.map((item) => {
          return (
            <div className="radio-item" key={item.value}>
              <RadioInput
                label={item.label}
                value={item.value}
                checked={item.checked}
                name={"sort"}
                onChange={(e) => radioButtonOnChangeHandler(e)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
