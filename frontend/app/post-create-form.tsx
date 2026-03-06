"use client";

import { useState } from "react";
import { ApiClient } from "../src/api/apiClient";

interface PostCreateFormState {
  title: string;
  content: string;
}

export function PostCreateForm(): JSX.Element {
  const [form, setForm] = useState<PostCreateFormState>({ title: "", content: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const validate = (): string | null => {
    if (form.title.trim().length === 0) return "Title is required";
    if (form.content.trim().length === 0) return "Content is required";
    return null;
  };

  const handleSubmit = async (): Promise<void> => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const api = new ApiClient("");
      await api.postPosts();
      setSuccess(true);
      setForm({ title: "", content: "" });
    } catch (e: unknown) {
      setError("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit();
      }}
    >
      <div>
        <label>
          Title
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            disabled={loading}
          />
        </label>
      </div>
      <div>
        <label>
          Content
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            disabled={loading}
          />
        </label>
      </div>
      {error && <p role="alert">{error}</p>}
      {success && <p>Post created successfully</p>}
      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
}
