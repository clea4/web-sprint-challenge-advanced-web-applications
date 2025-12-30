/* eslint-env jest */
/* global describe, test, expect */

import React from "react";
import { render, screen } from "@testing-library/react";
import Spinner from "./Spinner";

describe("Spinner component", () => {
  test("renders without crashing", () => {
    render(<Spinner />);
    const spinnerElement = screen.getByTestId("spinner");
    expect(spinnerElement).toBeInTheDocument();
  });

  test("has correct CSS class", () => {
    render(<Spinner />);
    const spinnerElement = screen.getByTestId("spinner");
    expect(spinnerElement).toHaveClass("spinner");
  });

  test("renders children if provided", () => {
    render(<Spinner><p>Loading...</p></Spinner>);
    const childElement = screen.getByText(/loading.../i);
    expect(childElement).toBeInTheDocument();
  });
});
