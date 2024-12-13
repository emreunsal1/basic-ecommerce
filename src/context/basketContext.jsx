import React, { createContext, useContext } from "react";
import { useState } from "react";
import { STORAGE } from "../utils/browserStorage";
import { useEffect } from "react";

const Context = createContext({});

export function BasketContext({ children }) {
  const [basket, setBasket] = useState([]);

  const addItem = (item) => {
    const storageBasket = JSON.parse(STORAGE.getLocal("basket"));
    const foundProduct = storageBasket.find(
      (product) => product.id === item.id
    );
    if (foundProduct) {
      updateItemCount(itemId, foundProduct.count + 1);
      return;
    }
    storageBasket.push({ id: item.id, count: 1 });
    STORAGE.setLocal(JSON.stringify(storageBasket));
    setBasket(storageBasket);
  };

  const removeItem = (itemId) => {
    const storageBasket = JSON.parse(STORAGE.getLocal("basket"));
    const filteredBasket = storageBasket.filter(
      (product) => product.id !== itemId
    );
    STORAGE.setLocal(JSON.stringify(filteredBasket));
    setBasket(filteredBasket);
  };

  const updateItemCount = (itemId, count) => {
    if (count == 0) {
      removeItem(itemId);
      return;
    }
    const storageBasket = JSON.parse(STORAGE.getLocal("basket"));
    const foundIndex = storageBasket.findIndex(
      (product) => product.id === item.id
    );
    storageBasket[foundIndex].count = count;
    STORAGE.setLocal(JSON.stringify(basket));
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

  return (
    <Context.Provider
      value={{
        basket,
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
