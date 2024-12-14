import React from "react";
import Button from "./Button";
import { useBasketContext } from "../context/basketContext";

export default function Card({ data, onClick = (data) => {} }) {
  const { addItem } = useBasketContext();

  return (
    <div className="card-wrapper" onClick={() => onClick(data)} id={data.id}>
      <div className="content">
        <div className="image-wrapper">
          {data.image && <img src={data.image} />}
        </div>
        <div className="price">{data.price}</div>
        <div className="name">{data.name}</div>
      </div>
      <Button onClick={() => addItem(data.id)} size="medium">
        Add To Cart
      </Button>
    </div>
  );
}
