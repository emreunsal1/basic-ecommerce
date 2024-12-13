import React from "react";
import Button from "./Button";
import { useBasketContext } from "../context/basketContext";

export default function Card({ image, name, price, id }) {
  const { addItem } = useBasketContext();

  return (
    <div className="card-wrapper" id={id}>
      <div className="content">
        <div className="image-wrapper">{image && <img src={image} />}</div>
        <div className="price">{price}</div>
        <div className="name">{name}</div>
      </div>
      <Button onClick={() => addItem(id)} size="medium">
        Add To Cart
      </Button>
    </div>
  );
}
