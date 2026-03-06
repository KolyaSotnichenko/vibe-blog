import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PostCreateForm } from "./post-create-form";
import { ApiClient } from "../src/api/apiClient";

jest.mock("../src/api/apiClient");

describe("PostCreateForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders initial state", () => {
    render(<PostCreateForm />);
    expect(screen.getByText("Create Post")).toBeInTheDocument();
  });

  it("shows validation error", async () => {
    render(<PostCreateForm />);
    fireEvent.click(screen.getByText("Create Post"));
    expect(await screen.findByRole("alert")).toHaveTextContent("Title is required");
  });

  it("handles success state", async () => {
    (ApiClient as jest.Mock).mockImplementation(() => ({ postPosts: jest.fn().mockResolvedValue(undefined) }));
    render(<PostCreateForm />);
    fireEvent.change(screen.getByLabelText("Title"), { target: { value: "t" } });
    fireEvent.change(screen.getByLabelText("Content"), { target: { value: "c" } });
    fireEvent.click(screen.getByText("Create Post"));
    await waitFor(() => expect(screen.getByText("Post created successfully")).toBeInTheDocument());
  });

  it("handles error state", async () => {
    (ApiClient as jest.Mock).mockImplementation(() => ({ postPosts: jest.fn().mockRejectedValue(new Error()) }));
    render(<PostCreateForm />);
    fireEvent.change(screen.getByLabelText("Title"), { target: { value: "t" } });
    fireEvent.change(screen.getByLabelText("Content"), { target: { value: "c" } });
    fireEvent.click(screen.getByText("Create Post"));
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("Failed to create post"));
  });
});
