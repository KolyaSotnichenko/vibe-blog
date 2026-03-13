import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import type { components } from "@/src/api/generated";
import { useCreateTodo, useUpdateTodo } from "@/src/api/todo/mutations";

type Todo = components["schemas"]["Todo"];
type CreateTodoRequest = components["schemas"]["CreateTodoRequest"];
type UpdateTodoRequest = components["schemas"]["UpdateTodoRequest"];

type Mode = "create" | "edit";

type Values = {
  title: string;
  description: string;
  status?: Todo["status"];
};

type Errors = Partial<Record<keyof Values, string>>;

type Params = {
  mode: Mode;
  initialTodo?: Todo;
};

const TITLE_MIN = 1;
const TITLE_MAX = 200;

export function useTodoForm({ mode, initialTodo }: Params) {
  const router = useRouter();
  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();

  const [values, setValues] = useState<Values>({
    title: initialTodo?.title ?? "",
    description: initialTodo?.description ?? "",
    status: initialTodo?.status,
  });

  const [errors, setErrors] = useState<Errors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const setField = useCallback(<K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }, []);

  const validate = useCallback((): boolean => {
    const nextErrors: Errors = {};
    const title = values.title.trim();

    if (!title) {
      nextErrors.title = "Title is required";
    } else if (title.length < TITLE_MIN) {
      nextErrors.title = "Title is too short";
    } else if (title.length > TITLE_MAX) {
      nextErrors.title = `Title must be at most ${TITLE_MAX} characters`;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [values.title]);

  const submit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitError(null);

      if (!validate()) return;

      try {
        if (mode === "create") {
          const payload: CreateTodoRequest = {
            title: values.title.trim(),
            description: values.description.trim() || undefined,
          };
          await createTodo.mutateAsync(payload);
        } else if (mode === "edit" && initialTodo) {
          const payload: UpdateTodoRequest = {
            title: values.title.trim(),
            description: values.description.trim() || undefined,
            status: values.status,
          };
          await updateTodo.mutateAsync({ id: initialTodo.id, data: payload });
        }

        router.push("/todos");
      } catch (err) {
        void err;
        setSubmitError("Something went wrong. Please try again.");
      }
    },
    [
      validate,
      mode,
      values.title,
      values.description,
      values.status,
      initialTodo,
      createTodo,
      updateTodo,
      router,
    ],
  );

  return {
    values,
    errors,
    isSubmitting: createTodo.isPending || updateTodo.isPending,
    submitError,
    setField,
    submit,
  };
}
