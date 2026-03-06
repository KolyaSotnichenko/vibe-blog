"use client";
import styles from "./page.module.css";
import { PostCreateForm } from "./post-create-form";
import { PostsList } from "./posts-list";
import { ApiClient } from "../src/api/apiClient";

export default function Home() {
  const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL ?? '');
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Posts Dashboard</h1>
        <p className={styles.subtitle}>Create and manage your content</p>
      </header>
      <main className={styles.main}>
        <section className={styles.card}>
          <h2>Create post</h2>
          <PostCreateForm />
        </section>
        <section className={styles.card}>
          <h2>Recent posts</h2>
          <PostsList apiClient={apiClient} />
        </section>
      </main>
    </div>
  );
}
