import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("PostEditPage", () => {
  it("renders edit form page", () => {
    render(<Page params={{ id: "1" }} /> as unknown as JSX.Element);
    expect(screen.getByText("Edit Post")).toBeInTheDocument();
  });
});
