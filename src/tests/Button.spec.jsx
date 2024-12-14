import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../components/Button";

describe("Button Component", () => {
  it("renders children correctly", () => {
    render(<Button>Click Me</Button>);

    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("applies the correct size class", () => {
    const { container } = render(<Button size="large">Large Button</Button>);

    expect(container.firstChild).toHaveClass("large");
  });

  it("applies the disabled class when disabled is true", () => {
    const { container } = render(
      <Button disabled={true}>Disabled Button</Button>
    );

    expect(container.firstChild).toHaveClass("disabled");
  });

  it("does not call onClick when disabled", () => {
    const mockOnClick = jest.fn();
    render(
      <Button disabled={true} onClick={mockOnClick}>
        Disabled Button
      </Button>
    );

    fireEvent.click(screen.getByText("Disabled Button"));

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it("calls onClick when the button is clicked", () => {
    const mockOnClick = jest.fn();
    render(<Button onClick={mockOnClick}>Clickable Button</Button>);

    fireEvent.click(screen.getByText("Clickable Button"));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
