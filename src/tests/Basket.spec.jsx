import React from "react";
import Basket from "../components/Basket";
import { render, screen } from "@testing-library/react";
import * as BasketItem from "../components/BasketItem";
import * as basketContext from "../context/basketContext";

jest
  .spyOn(BasketItem, "default")
  .mockImplementation(() => (
    <div data-testid="mocked-basket-item">mocked-basket-item</div>
  ));

jest.spyOn(basketContext, "useBasketContext").mockImplementation(() => ({
  basket: [
    {
      id: 1,
    },
    {
      id: 2,
    },
  ],
}));

describe("Basket specs", () => {
  it("should render basket element", () => {
    const { container, debug, queryAllByTestId } = render(<Basket />);

    const basketElement = container.querySelector(".basket");

    expect(queryAllByTestId("mocked-basket-item")).toHaveLength(2);
    expect(basketElement).toBeInTheDocument();
  });
});
