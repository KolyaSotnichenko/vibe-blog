import type { components } from "@/src/api/generated";

type Todo = components["schemas"]["Todo"];

type Props = {
  todo: Todo;
};

export function TodoDetails({ todo }: Props) {
  return (
    <section className="space-y-4">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold leading-tight">{todo.title}</h1>
        <p className="text-sm text-muted-foreground">
          Status: {todo.completed ? "Completed" : "Open"}
        </p>
      </header>

      {todo.description && (
        <p className="whitespace-pre-wrap text-base leading-relaxed">{todo.description}</p>
      )}
    </section>
  );
}
