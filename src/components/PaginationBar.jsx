import React from "react";
import LeftIcon from "../assets/Arrow-left.svg";
import RightIcon from "../assets/Arrow-right.svg";
import classNames from "classnames";

export default function PaginationBar({
  totalPage,
  currentPage = 0,
  onChange = () => {},
}) {
  if (totalPage < 2) {
    return null;
  }
  const getPaginationItems = () => {
    const paginationItems = [];

    paginationItems.push(0);

    if (currentPage > 2) {
      paginationItems.push("dots-left");
    }

    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPage - 2, currentPage + 1);
      i++
    ) {
      paginationItems.push(i);
    }

    if (currentPage < totalPage - 3) {
      paginationItems.push("dots-right");
    }
    paginationItems.push(totalPage - 1);
    return paginationItems;
  };

  const changePageHandler = (newPage) => {
    if (newPage >= 0 && newPage < totalPage) {
      onChange(newPage);
    }
  };

  return (
    <div className="pagination-bar-wrapper">
      <div
        className={classNames("left-icon-wrapper", {
          disabled: currentPage <= 0,
        })}
        onClick={() => changePageHandler(currentPage - 1)}
      >
        <img src={LeftIcon} alt="Previous" />
      </div>

      {getPaginationItems().map((item, index) =>
        item === "dots-left" || item === "dots-right" ? (
          <div key={index} className="pagination-item dots">
            ...
          </div>
        ) : (
          <div
            key={index}
            className={classNames("pagination-item", {
              active: currentPage === item,
            })}
            onClick={() => onChange(item)}
          >
            {item + 1}
          </div>
        )
      )}

      <div
        onClick={() => changePageHandler(currentPage + 1)}
        className={classNames("right-icon-wrapper", {
          disabled: currentPage + 1 >= totalPage,
        })}
      >
        <img src={RightIcon} alt="Next" />
      </div>
    </div>
  );
}
