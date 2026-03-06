import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PostEditForm } from "./post-edit-form";
import { ApiClient } from "../src/api/apiClient";

jest.mock("../src/api/apiClient");

describe("PostEditForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading state", () => {
    (ApiClient as jest.Mock).mockImplementation(() => ({ getPostById: jest.fn(() => new Promise(() => {})) }));
    render(<PostEditForm postId={1} />);
    expect(screen.getByText("Loading post...")).toBeInTheDocument();
  });

  it("renders loaded data", async () => {
    (ApiClient as jest.Mock).mockImplementation(() => ({ getPostById: jest.fn().mockResolvedValue({ title: "t", content: "c" }) }));
    render(<PostEditForm postId={1} />);
    expect(await screen.findByDisplayValue("t")).toBeInTheDocument();
  });

  it("handles save success", async () => {
    (ApiClient as jest.Mock).mockImplementation(() => ({
      getPostById: jest.fn().mockResolvedValue({ title: "t", content: "c" }),
      updatePost: jest.fn().mockResolvedValue(undefined),
    }));
    render(<PostEditForm postId={1} />);
    fireEvent.click(await screen.findByText("Save changes"));
    await waitFor(() => expect(screen.getByText("Post updated successfully")).toBeInTheDocument());
  });

  it("handles error on save", async () => {
    (ApiClient as jest.Mock).mockImplementation(() => ({
      getPostById: jest.fn().mockResolvedValue({ title: "t", content: "c" }),
      updatePost: jest.fn().mockRejectedValue(new Error()),
    }));
    render(<PostEditForm postId={1} />);
    fireEvent.click(await screen.findByText("Save changes"));
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("Failed to update post"));
  });
});
