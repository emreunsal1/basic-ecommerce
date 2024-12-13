import React, { createContext, useContext, useEffect, useState } from "react";

import { fetchProducts } from "../service/products";

const Context = createContext({
  products: [],
  brands: [],
  models: [],
  isLoading: true,
});

export function ProductContext({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);

  const getProducts = async () => {
    const response = await fetchProducts();
    setIsLoading(false);
    setProducts(response.products);
    setBrands(response.brands);
    setModels(response.models);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Context.Provider
      value={{
        products,
        brands,
        models,
        isLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useProductContext = () => useContext(Context);
