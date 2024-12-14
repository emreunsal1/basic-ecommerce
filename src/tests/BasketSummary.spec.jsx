import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BasketSummary from "../components/BasketSummary";
import { useBasketContext } from "../context/basketContext";

jest.mock("../context/basketContext", () => ({
  useBasketContext: jest.fn(),
}));

jest.mock("../components/Button", () => ({ children, onClick }) => (
  <button onClick={onClick}>{children}</button>
));

describe("BasketSummary Component", () => {
  beforeEach(() => {
    useBasketContext.mockReturnValue({
      totalPrice: 150,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the total price correctly", () => {
    render(<BasketSummary />);

    expect(screen.getByText("Total Price:")).toBeInTheDocument();
    expect(screen.getByText("150$")).toBeInTheDocument();
  });

  it("renders the Checkout button", () => {
    render(<BasketSummary />);

    const checkoutButton = screen.getByText("Checkout");
    expect(checkoutButton).toBeInTheDocument();
  });

  it("triggers the alert on button click", () => {
    const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {});

    render(<BasketSummary />);

    const checkoutButton = screen.getByText("Checkout");
    fireEvent.click(checkoutButton);

    expect(mockAlert).toHaveBeenCalledWith("Ödeme işlemi tamamlandı.");

    mockAlert.mockRestore();
  });
});
