import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { fetchProducts } from "../service/products";

const Context = createContext({});

const SORT_TYPE = {
  OLD_TO_NEW: "OLD_TO_NEW",
  NEW_TO_OLD: "NEW_TO_OLD",
  PRICE_HIGH_TO_LOW: "PRICE_HIGH_TO_LOW",
  PRICE_LOW_TO_HIGH: "PRICE_LOW_TO_HIGH",
};

export function SearchContext({ children }) {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortType, setSortType] = useState(SORT_TYPE.OLD_TO_NEW);

  const getProducts = async () => {
    const response = await fetchProducts();
    setProducts(response.products);
    setBrands(response.brands);
    setModels(response.models);
  };

  const filterProducts = () => {
    let filteredProducts = products;

    if (searchText.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedModels.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedModels.includes(product.model)
      );
    }
    if (selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    return filteredProducts;
  };

  const sortProducts = (products) => {
    return products.sort((a, b) => {
      if (sortType == SORT_TYPE.NEW_TO_OLD) {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
      if (sortType == SORT_TYPE.OLD_TO_NEW) {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      if (sortType == SORT_TYPE.PRICE_HIGH_TO_LOW) {
        return Number(a.price) - Number(b.price);
      }
      if (sortType == SORT_TYPE.PRICE_LOW_TO_HIGH) {
        return Number(b.price) - Number(a.price);
      }
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Context.Provider
      value={{
        products: sortProducts(filterProducts()),
        brands,
        models,
        selectedBrands,
        selectedModels,
        sortType,
        searchText,
        setProducts,
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
