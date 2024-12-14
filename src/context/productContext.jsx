import React, { createContext, useContext, useEffect, useState } from "react";

import { fetchProductById, fetchProducts } from "../service/products";

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
  const getProductById = async (id) => {
    const response = await fetchProductById(id);
    setIsLoading(false);
    return response;
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
        getProductById,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useProductContext = () => useContext(Context);
