"use client";

import { useEffect, useState } from 'react';
import { ApiClient } from '../src/api/apiClient';
import styles from './posts-list.module.css';

interface Post {
  id: number;
  title?: string | null;
}

interface PostsListProps {
  apiClient: ApiClient;
}

export function PostsList({ apiClient }: PostsListProps) {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState<string | null>(null);

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
    return <p className={styles.state}>Завантаження...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (!posts || posts.length === 0) {
    return <p className={styles.state}>Пости відсутні</p>;
  }

  return (
    <section aria-labelledby="recent-posts-title" className={styles.container}>
      <h2 id="recent-posts-title" className={styles.title}>Пости</h2>
      {deleteSuccess && <p className={styles.success}>{deleteSuccess}</p>}
      {deleteError && <p className={styles.error}>{deleteError}</p>}
      <ul className={styles.list}>
        {posts.map((post) => (
          <li key={post.id} className={styles.item}>
            <span className={styles.itemTitle}>{post.title ?? `Post #${post.id}`}</span>
            <button
              className={styles.deleteButton}
              onClick={async () => {
                const confirmed = window.confirm('Ви впевнені, що хочете видалити пост?');
                if (!confirmed) return;
                setDeletingId(post.id);
                setDeleteError(null);
                setDeleteSuccess(null);
                try {
                  await apiClient.deletePost(post.id);
                  setPosts((prev) => (prev ? prev.filter((p) => p.id !== post.id) : prev));
                  setDeleteSuccess('Пост успішно видалено');
                } catch (err: unknown) {
                  void err;
                  setDeleteError('Не вдалося видалити пост');
                } finally {
                  setDeletingId(null);
                }
              }}
              disabled={deletingId === post.id}
            >
              {deletingId === post.id ? 'Видалення...' : 'Видалити'}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
