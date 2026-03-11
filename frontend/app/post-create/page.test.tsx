import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("PostCreatePage", () => {
  it("renders create form page", () => {
    render(<Page />);
    expect(screen.getByText("Create Post")).toBeInTheDocument();
  });
});
