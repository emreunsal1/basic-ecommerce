import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import {
  ProductContext,
  useProductContext,
} from "../../context/productContext";
import { fetchProducts, fetchProductById } from "../../service/products";

jest.mock("../../service/products", () => ({
  fetchProducts: jest.fn(),
  fetchProductById: jest.fn(),
}));

describe("ProductContext", () => {
  beforeEach(() => {
    fetchProducts.mockReset();
    fetchProductById.mockReset();
  });

  it("should fetch products and brands when component mounts", async () => {
    const mockResponse = {
      products: [{ id: 1, name: "Product 1" }],
      brands: ["Brand 1", "Brand 2"],
      models: ["Model A", "Model B"],
    };

    fetchProducts.mockResolvedValue(mockResponse);

    render(
      <ProductContext>
        <ProductConsumer />
      </ProductContext>
    );

    await waitFor(() => expect(screen.queryByText("Loading...")).toBeNull());

    expect(screen.getByTestId("products")).toHaveTextContent("Product 1");
    expect(screen.getByTestId("brands")).toHaveTextContent("Brand 1");
    expect(screen.getByTestId("models")).toHaveTextContent("Model A");
  });

  it("should show loading state initially", () => {
    fetchProducts.mockReturnValue(new Promise(() => {}));

    render(
      <ProductContext>
        <ProductConsumer />
      </ProductContext>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should handle empty response gracefully", async () => {
    fetchProducts.mockResolvedValue({ products: [], brands: [], models: [] });

    render(
      <ProductContext>
        <ProductConsumer />
      </ProductContext>
    );

    await waitFor(() => expect(screen.queryByText("Loading...")).toBeNull());

    expect(screen.getByTestId("products")).toHaveTextContent(
      "No products available"
    );
  });
});

const ProductConsumer = () => {
  const { products, brands, models, isLoading } = useProductContext();
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      <div data-testid="products">
        {products.length > 0 ? products[0].name : "No products available"}
      </div>
      <div data-testid="brands">
        {brands.length > 0 ? brands.join(", ") : "No brands"}
      </div>
      <div data-testid="models">
        {models.length > 0 ? models.join(", ") : "No models"}
      </div>
    </div>
  );
};
