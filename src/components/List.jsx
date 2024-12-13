import React from "react";
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

  const paginatedProducts = paginate();

  return (
    <>
      {!data.length && (
        <div className="not-found-text">
          <span>404</span>
          WE COULD NOT FOUND ANY PRODUCTS WITH YOUR SEARCH CRITERIA!
        </div>
      )}
      {data && (
        <div className="list-wrapper">
          {paginatedProducts.map((item) => {
            return (
              <div className="list-item" key={item.id}>
                <Card
                  id={item.id}
                  price={item.price}
                  image={item.image}
                  name={item.name}
                />
              </div>
            );
          })}
        </div>
      )}

      <PaginationBar
        onChange={(current) => setCurrentPage(current)}
        totalPage={totalPage}
        currentPage={currentPage}
      />
    </>
  );
}
