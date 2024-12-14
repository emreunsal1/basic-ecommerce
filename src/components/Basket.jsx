import React from "react";
import BasketItem from "../components/BasketItem";
import { useBasketContext } from "../context/basketContext";

export default function Basket() {
  const { basket } = useBasketContext();

  return (
    <div className="basket">
      {basket?.map((item) => (
        <BasketItem item={item} key={item.id} />
      ))}
    </div>
  );
}
