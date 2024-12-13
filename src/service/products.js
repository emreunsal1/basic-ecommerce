import { instance } from "../utils/axios";

export const fetchProducts = async () => {
  const response = await instance.get();
  const { data } = response;
  const result = data.reduce(
    (prev, product) => {
      prev.models.add(product.model);
      prev.brands.add(product.brand);
      prev.products.push(product);
      return prev;
    },
    {
      models: new Set(),
      brands: new Set(),
      products: [],
    }
  );

  return {
    models: Array.from(result.models),
    brands: Array.from(result.brands),
    products: result.products,
  };
};
