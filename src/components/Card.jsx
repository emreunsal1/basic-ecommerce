import React from "react";

export default function Card({ image, name, price, id }) {
  return (
    <div className="card-wrapper" id={id}>
      <div className="image-wrapper">{image && <img src={image} />}</div>
      <div className="name">{name}</div>
      <div className="price">{price}</div>
    </div>
  );
}
