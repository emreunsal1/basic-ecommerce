import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { useProductContext } from "./productContext";

const Context = createContext({
  products: [],
});

const SORT_TYPE = {
  OLD_TO_NEW: "OLD_TO_NEW",
  NEW_TO_OLD: "NEW_TO_OLD",
  PRICE_HIGH_TO_LOW: "PRICE_HIGH_TO_LOW",
  PRICE_LOW_TO_HIGH: "PRICE_LOW_TO_HIGH",
};

export function SearchContext({ children }) {
  const { products } = useProductContext();
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortType, setSortType] = useState(SORT_TYPE.OLD_TO_NEW);

  const filterProducts = () => {
    let filteredProducts = products;

    if (searchText.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedModels.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedModels.includes(product.model.toLowerCase())
      );
    }
    if (selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedBrands.includes(product.brand.toLowerCase())
      );
    }

    return filteredProducts;
  };

  const sortProducts = (products) => {
    return products.sort((a, b) => {
      if (sortType === SORT_TYPE.NEW_TO_OLD) {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      if (sortType === SORT_TYPE.OLD_TO_NEW) {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
      if (sortType === SORT_TYPE.PRICE_HIGH_TO_LOW) {
        return Number(b.price) - Number(a.price);
      }
      if (sortType === SORT_TYPE.PRICE_LOW_TO_HIGH) {
        return Number(a.price) - Number(b.price);
      }
      return 0;
    });
  };

  return (
    <Context.Provider
      value={{
        searchedProducts: sortProducts(filterProducts()),
        selectedBrands,
        selectedModels,
        sortType,
        searchText,
        setSelectedBrands,
        setSelectedModels,
        setSearchText,
        setSortType,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useSearchContext = () => useContext(Context);
