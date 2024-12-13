import React from "react";
import { useSearchContext } from "../context/searchContext";
import Card from "./Card";

export default function List({ data }) {
  return (
    <div className="list-wrapper">
      {data.map((item) => {
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
    </div>
  );
}
