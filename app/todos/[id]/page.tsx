import { notFound } from "next/navigation";
import { todoService } from "@/src/api/todo/todoService";
import { TodoDetails } from "@/src/components/todo/TodoDetails";
import { TodoActions } from "@/src/components/todo/TodoActions";

type PageProps = {
  params: { id: string };
};

export default async function TodoPage({ params }: PageProps) {
  try {
    const todo = await todoService.get(params.id);

    return (
      <main className="mx-auto max-w-2xl px-4 py-6">
        <TodoDetails todo={todo} />
        <div className="mt-6">
          <TodoActions todo={todo} />
        </div>
      </main>
    );
  } catch {
    notFound();
  }
}
