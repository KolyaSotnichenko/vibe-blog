"use client";

import { useEffect, useState } from 'react';
import { ApiClient } from '../src/api/apiClient';

interface Post {
  id: number;
  title?: string;
}

interface PostsListProps {
  apiClient: ApiClient;
}

export function PostsList({ apiClient }: PostsListProps) {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    apiClient
      .getPosts()
      .then((data) => {
        if (!active) return;
        setPosts(data as Post[]);
        setError(null);
      })
      .catch(() => {
        if (!active) return;
        setError('Не вдалося завантажити список постів');
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [apiClient]);

  if (loading) {
    return <p>Завантаження...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!posts || posts.length === 0) {
    return <p>Пости відсутні</p>;
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title ?? `Post #${post.id}`}</li>
      ))}
    </ul>
  );
}
