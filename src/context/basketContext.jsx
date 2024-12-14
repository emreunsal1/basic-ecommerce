import React, { createContext, useContext } from "react";
import { useState } from "react";
import { STORAGE } from "../utils/browserStorage";
import { useEffect } from "react";
import { useProductContext } from "./productContext";

const Context = createContext({
  basket: [],
});

export function BasketContext({ children }) {
  const [basket, setBasket] = useState([]);
  const { products, isLoading } = useProductContext();

  const addItem = (productId) => {
    const storageBasket = JSON.parse(STORAGE.getLocal("basket"));
    const foundProduct = storageBasket.find(
      (product) => product.id === productId
    );
    if (foundProduct) {
      updateItemCount(productId, foundProduct.count + 1);
      return;
    }
    storageBasket.push({ id: productId, count: 1 });
    STORAGE.setLocal("basket", JSON.stringify(storageBasket));
    setBasket(storageBasket);
  };

  const removeItem = (itemId) => {
    const storageBasket = JSON.parse(STORAGE.getLocal("basket"));
    const filteredBasket = storageBasket.filter(
      (product) => product.id !== itemId
    );
    STORAGE.setLocal("basket", JSON.stringify(filteredBasket));
    setBasket(filteredBasket);
  };

  const updateItemCount = (itemId, count) => {
    if (count == 0) {
      removeItem(itemId);
      return;
    }
    const storageBasket = JSON.parse(STORAGE.getLocal("basket"));
    const foundIndex = storageBasket.findIndex(
      (product) => product.id === itemId
    );
    storageBasket[foundIndex].count = count;
    STORAGE.setLocal("basket", JSON.stringify(storageBasket));
    setBasket(storageBasket);
  };

  useEffect(() => {
    const storageBasket = STORAGE.getLocal("basket");
    if (!storageBasket) {
      STORAGE.setLocal("basket", JSON.stringify([]));
      return;
    }
    setBasket(JSON.parse(storageBasket));
  }, []);

  const totalPrice = basket.reduce((prev, item) => {
    const foundProduct = products.find((_item) => _item.id === item.id);
    prev += foundProduct?.price * item.count;
    return prev;
  }, 0);

  return (
    <Context.Provider
      value={{
        basket,
        totalPrice,
        addItem,
        removeItem,
        updateItemCount,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useBasketContext = () => useContext(Context);
