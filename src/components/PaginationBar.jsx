import React from "react";
import LeftIcon from "../assets/Arrow-left.svg";
import RightIcon from "../assets/Arrow-right.svg";
import classNames from "classnames";

export default function PaginationBar({
  totalPage,
  currentPage = 0,
  onChange = () => {},
}) {
  return (
    <div className="pagination-bar-wrapper">
      <div className="left-icon-wrapper">
        <img src={LeftIcon} />
      </div>
      {Array.from(Array(totalPage).keys()).map((page) => (
        <div
          className={classNames("pagination-item", {
            active: currentPage == page,
          })}
          onClick={() => onChange(page)}
        >
          {page + 1}
        </div>
      ))}
      <div className="right-icon-wrapper">
        <img src={RightIcon} />
      </div>
    </div>
  );
}
