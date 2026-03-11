"use client";

 import { useEffect, useState } from "react";
 import { ApiClient } from "../src/api/apiClient";

interface PostEditFormProps {
  postId: number;
}

interface PostFormState {
  title: string;
  content: string;
}

export function PostEditForm({ postId }: PostEditFormProps): React.ReactElement {
  const [form, setForm] = useState<PostFormState>({ title: "", content: "" });
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const load = async (): Promise<void> => {
      try {
        const api = new ApiClient("");
        const post = (await api.getPostById(postId)) as PostFormState;
        setForm({ title: post.title, content: post.content });
        } catch {
           setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [postId]);

  const handleSubmit = async (): Promise<void> => {
    if (form.title.trim() === "" || form.content.trim() === "") {
      setError("Title and content are required");
      return;
    }
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const api = new ApiClient("");
      await api.updatePost(postId, form);
      setSuccess(true);
     } catch (error: unknown) {
        const err = error as Error & { status?: number };
        if (err.status === 422) {
          setError("Validation error");
        } else {
          setError("Failed to update post");
        }
     } finally {
       setSaving(false);
     }
  };

  if (loading) {
    return <p>Loading post...</p>;
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
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
            disabled={saving}
          />
        </label>
      </div>
      <div>
        <label>
          Content
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            disabled={saving}
          />
        </label>
      </div>
      {error && <p role="alert">{error}</p>}
      {success && <p>Post updated successfully</p>}
      <button type="submit" disabled={saving}>
        {saving ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
