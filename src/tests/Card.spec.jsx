import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Card from "../components/Card";
import { useBasketContext } from "../context/basketContext";

jest.mock("../context/basketContext", () => ({
  useBasketContext: jest.fn(),
}));

describe("Card Component", () => {
  const mockAddItem = jest.fn();
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockAddItem.mockReset();
    mockOnClick.mockReset();

    useBasketContext.mockReturnValue({
      addItem: mockAddItem,
    });
  });

  it("should render card with product data", () => {
    const data = {
      id: 1,
      image: "product-image.jpg",
      name: "Product Name",
      price: 100,
    };

    render(<Card data={data} onClick={mockOnClick} />);

    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("Product Name")).toBeInTheDocument();
  });

  it("should call onClick when the card is clicked", () => {
    const data = {
      id: 1,
      image: "product-image.jpg",
      name: "Product Name",
      price: 100,
    };

    render(<Card data={data} onClick={mockOnClick} />);

    fireEvent.click(screen.getByTestId(data.id));

    expect(mockOnClick).toHaveBeenCalledWith(data);
  });

  it("should call addItem when the 'Add To Cart' button is clicked", () => {
    const data = {
      id: 1,
      image: "product-image.jpg",
      name: "Product Name",
      price: 100,
    };

    render(<Card data={data} onClick={mockOnClick} />);

    fireEvent.click(screen.getByText("Add To Cart"));

    expect(mockAddItem).toHaveBeenCalledWith(data.id);
  });
});
