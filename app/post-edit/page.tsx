export default function EditPost() {
  return (
    <main style={{ padding: 32, background: '#fafafa', minHeight: '100vh' }}>
      <h1>Edit post</h1>
      <form>
        <input placeholder="Title" />
        <br />
        <textarea placeholder="Content" />
      </form>
    </main>
  );
}
