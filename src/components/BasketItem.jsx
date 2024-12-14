import React from "react";
import { useBasketContext } from "../context/basketContext";
import Counter from "../components/Counter";
import { useProductContext } from "../context/productContext";

export default function BasketItem({ item }) {
  const { products } = useProductContext();
  const { updateItemCount } = useBasketContext();

  const foundProduct = products.find((_item) => _item.id == item.id);

  return (
    <div className="basket-item">
      <div className="basket-item-content">
        <div className="basket-item-title">{foundProduct?.name}</div>
        <div className="basket-item-price">
          {foundProduct?.price * item.count} ₺
        </div>
      </div>
      <Counter
        count={item.count}
        onChange={(count) => updateItemCount(item.id, count)}
      ></Counter>
    </div>
  );
}
