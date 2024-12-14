import React, { Children } from "react";
import CheckBoxInput from "./CheckBoxInput";
import Search from "./Search";
import { useState } from "react";
import { useSearchContext } from "../context/searchContext";

export default function FilterBox({
  title,
  data,
  activeValues,
  onChange = () => {},
}) {
  const [filteredData, setFilteredData] = useState(data);

  const searchHandler = (e) => {
    const searchValue = e.target.value;
    const response = data.filter((item) =>
      item.toLowerCase().includes(searchValue)
    );
    setFilteredData(response);
  };

  return (
    <div className="filter-box-wrapper">
      <div className="title">{title}</div>
      <div className="content">
        <div className="search-bar">
          <Search onChange={(e) => searchHandler(e)} variant="secondary" />
        </div>
        <div className="checkbox-list-wrapper">
          {filteredData.map((item, index) => {
            return (
              <div className="checkbox-list-item" key={index}>
                <CheckBoxInput
                  onChange={(e) => onChange(e)}
                  label={item}
                  value={item.toLowerCase()}
                  checked={activeValues.includes(item.toLowerCase())}
                  name="brands"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
