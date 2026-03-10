"use client";

import { useState } from "react";
import { ApiClient } from "../src/api/apiClient";

interface PostCreateFormState {
  title: string;
  content: string;
}

export function PostCreateForm(): React.ReactElement {
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
       const api = new ApiClient(process.env.NEXT_PUBLIC_API_URL ?? "");
       await api.postPosts({ title: form.title, content: form.content });
       setSuccess(true);
      setForm({ title: "", content: "" });
     } catch (error: unknown) {
       void error;
       setError("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="postForm"
      onSubmit={(event) => {
        event.preventDefault();
        void handleSubmit();
      }}
    >
      <h2 className="postFormTitle">Create post</h2>
      <div className="postFormField">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          disabled={loading}
          placeholder="Post title"
        />
      </div>
      <div className="postFormField">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          disabled={loading}
          placeholder="Write your post..."
          rows={5}
        />
      </div>
      {error && <p className="postFormError" role="alert">{error}</p>}
      {success && <p className="postFormSuccess">Post created successfully</p>}
      <button className="postFormButton" type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
}
