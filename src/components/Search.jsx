import React from "react";
import SearchIcon from "../assets/Search.svg";
import classNames from "classnames";

export const SEARCH_VARIANTS = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
};

function Search({
  value,
  onChange,
  placeholder = "Search",
  variant = SEARCH_VARIANTS.PRIMARY,
}) {
  const searchClassname = classNames("search", variant);

  return (
    <div className={searchClassname}>
      <div className="search-icon">
        <img src={SearchIcon} />
      </div>
      <input placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
}

export default Search;
