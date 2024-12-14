import { fetchProducts, fetchProductById } from "../utils/products";
import { instance } from "../utils/axios";

jest.mock("../utils/axios", () => ({
  instance: {
    get: jest.fn(),
  },
}));

describe("Product API functions", () => {
  describe("fetchProducts", () => {
    it("should fetch products and return formatted data", async () => {
      const mockResponse = {
        data: [
          { id: 1, model: "Model A", brand: "Brand A", price: 100 },
          { id: 2, model: "Model B", brand: "Brand B", price: 200 },
          { id: 3, model: "Model A", brand: "Brand A", price: 150 },
        ],
      };

      instance.get.mockResolvedValue(mockResponse);

      const result = await fetchProducts();

      expect(instance.get).toHaveBeenCalledTimes(1);

      expect(result).toEqual({
        models: ["Model A", "Model B"],
        brands: ["Brand A", "Brand B"],
        products: mockResponse.data,
      });
    });

    it("should handle empty data response correctly", async () => {
      const mockResponse = { data: [] };

      instance.get.mockResolvedValue(mockResponse);

      const result = await fetchProducts();

      expect(result).toEqual({
        models: [],
        brands: [],
        products: [],
      });
    });
  });

  describe("fetchProductById", () => {
    it("should fetch a single product by ID", async () => {
      const mockProduct = {
        id: 1,
        model: "Model A",
        brand: "Brand A",
        price: 100,
      };

      instance.get.mockResolvedValue({ data: mockProduct });

      const result = await fetchProductById(1);

      expect(instance.get).toHaveBeenCalledWith(1);

      expect(result).toEqual(mockProduct);
    });

    it("should handle errors gracefully", async () => {
      const errorMessage = "Product not found";
      instance.get.mockRejectedValue(new Error(errorMessage));

      await expect(fetchProductById(1)).rejects.toThrow(errorMessage);
    });
  });
});
