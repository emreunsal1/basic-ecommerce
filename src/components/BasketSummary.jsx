import React from "react";
import Button from "./Button";
import { useBasketContext } from "../context/basketContext";

export default function BasketSummary() {
  const { totalPrice } = useBasketContext();

  return (
    <div className="basket-summary">
      <div className="total-price">
        Total Price: <span>{totalPrice}$</span>
      </div>
      <Button onClick={() => alert("Ödeme işlemi tamamlandı.")}>
        Checkout
      </Button>
    </div>
  );
}
