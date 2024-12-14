import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BasketItem from "../components/BasketItem";
import { useBasketContext } from "../context/basketContext";
import { useProductContext } from "../context/productContext";

jest.mock("../context/basketContext", () => ({
  useBasketContext: jest.fn(),
}));

jest.mock("../context/productContext", () => ({
  useProductContext: jest.fn(),
}));

jest.mock("../components/Counter", () => ({ count, onChange }) => (
  <button onClick={() => onChange(count + 1)}>Increment</button>
));

describe("BasketItem Component", () => {
  const mockProducts = [
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 200 },
  ];

  const mockUpdateItemCount = jest.fn();

  beforeEach(() => {
    useProductContext.mockReturnValue({
      products: mockProducts,
    });

    useBasketContext.mockReturnValue({
      updateItemCount: mockUpdateItemCount,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the basket item correctly", () => {
    const item = { id: 1, count: 2 };

    render(<BasketItem item={item} />);

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("200 ₺")).toBeInTheDocument();
  });

  it("calls updateItemCount with correct arguments when Counter changes", () => {
    const item = { id: 1, count: 2 };

    render(<BasketItem item={item} />);

    const incrementButton = screen.getByText("Increment");
    fireEvent.click(incrementButton);

    expect(mockUpdateItemCount).toHaveBeenCalledWith(1, 3);
  });
});
