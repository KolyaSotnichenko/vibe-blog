import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("PostEditPage", () => {
  it("shows loading state while post is loading", () => {
    render(<Page params={{ id: "1" }} /> as unknown as JSX.Element);
    expect(screen.getByText("Loading post...")).toBeInTheDocument();
  });
});
