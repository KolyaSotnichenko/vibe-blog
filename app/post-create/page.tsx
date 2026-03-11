export default function CreatePost() {
  return (
    <main style={{ padding: 32, background: '#fafafa', minHeight: '100vh' }}>
      <h1>Create post</h1>
      <form>
        <input placeholder="Title" />
        <br />
        <textarea placeholder="Content" />
      </form>
    </main>
  );
}
