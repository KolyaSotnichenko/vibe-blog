import { TodoEditForm } from "@/src/components/todo/TodoEditForm";

export default function EditTodoPage({ params }: { params: { id: string } }) {
  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="mb-6 text-2xl font-semibold">Edit ToDo</h1>
      <div className="rounded border p-4">
        <TodoEditForm id={params.id} />
      </div>
    </main>
  );
}
