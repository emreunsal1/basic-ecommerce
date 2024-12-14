import React from "react";
import { render, screen, act } from "@testing-library/react";
import { BasketContext, useBasketContext } from "../../context/basketContext";
import { useProductContext } from "../../context/productContext";
import { STORAGE } from "../../utils/browserStorage";

jest.mock("../../context/productContext", () => ({
  useProductContext: jest.fn(),
}));

jest.mock("../../utils/browserStorage", () => ({
  STORAGE: {
    getLocal: jest.fn(),
    setLocal: jest.fn(),
  },
}));

describe("BasketContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    useProductContext.mockReturnValue({
      products: [
        { id: 1, name: "Product 1", price: 100 },
        { id: 2, name: "Product 2", price: 200 },
      ],
      isLoading: false,
    });

    STORAGE.getLocal.mockImplementation((key) => {
      if (key === "basket") {
        return JSON.stringify([{ id: 1, count: 2 }]);
      }
    });
    STORAGE.setLocal.mockImplementation(() => {});
  });

  const TestComponent = () => {
    const { basket, totalPrice, addItem, removeItem, updateItemCount } =
      useBasketContext();

    return (
      <div>
        <div data-testid="basket">{JSON.stringify(basket)}</div>
        <div data-testid="totalPrice">{totalPrice}</div>
        <button onClick={() => addItem(2)}>Add Item</button>
        <button onClick={() => removeItem(1)}>Remove Item</button>
        <button onClick={() => updateItemCount(1, 3)}>Update Item Count</button>
      </div>
    );
  };

  it("initializes the basket from local storage", () => {
    render(
      <BasketContext>
        <TestComponent />
      </BasketContext>
    );

    expect(screen.getByTestId("basket")).toHaveTextContent(
      JSON.stringify([{ id: 1, count: 2 }])
    );
  });

  it("calculates the total price correctly", () => {
    render(
      <BasketContext>
        <TestComponent />
      </BasketContext>
    );

    expect(screen.getByTestId("totalPrice")).toHaveTextContent("200");
  });

  it("adds an item to the basket", () => {
    render(
      <BasketContext>
        <TestComponent />
      </BasketContext>
    );

    act(() => {
      screen.getByText("Add Item").click();
    });

    expect(screen.getByTestId("basket")).toHaveTextContent(
      JSON.stringify([
        { id: 1, count: 2 },
        { id: 2, count: 1 },
      ])
    );

    expect(STORAGE.setLocal).toHaveBeenCalledWith(
      "basket",
      JSON.stringify([
        { id: 1, count: 2 },
        { id: 2, count: 1 },
      ])
    );
  });

  it("removes an item from the basket", () => {
    render(
      <BasketContext>
        <TestComponent />
      </BasketContext>
    );

    act(() => {
      screen.getByText("Remove Item").click();
    });

    expect(screen.getByTestId("basket")).toHaveTextContent("[]");

    expect(STORAGE.setLocal).toHaveBeenCalledWith("basket", JSON.stringify([]));
  });

  it("updates the item count", () => {
    render(
      <BasketContext>
        <TestComponent />
      </BasketContext>
    );

    act(() => {
      screen.getByText("Update Item Count").click();
    });

    expect(screen.getByTestId("basket")).toHaveTextContent(
      JSON.stringify([{ id: 1, count: 3 }])
    );

    expect(STORAGE.setLocal).toHaveBeenCalledWith(
      "basket",
      JSON.stringify([{ id: 1, count: 3 }])
    );
  });
});
