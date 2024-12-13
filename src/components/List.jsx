import React from "react";
import { useSearchContext } from "../context/searchContext";
import Card from "./Card";
import PaginationBar from "./PaginationBar";
import { useState } from "react";

const PAGE_COUNT = 12;

export default function List({ data }) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPage = Math.ceil(data.length / PAGE_COUNT);

  const paginate = () => {
    const startIndex = currentPage * PAGE_COUNT;
    const endIndex = Math.min(startIndex + PAGE_COUNT, data.length);
    return data.slice(startIndex, endIndex);
  };

  return (
    <div className="list-wrapper">
      {paginate().map((item) => {
        return (
          <div className="list-item">
            <Card
              id={item.id}
              price={item.price}
              image={item.image}
              name={item.name}
            />
          </div>
        );
      })}
      <PaginationBar
        onChange={(current) => setCurrentPage(current)}
        totalPage={totalPage}
        currentPage={currentPage}
      />
    </div>
  );
}
