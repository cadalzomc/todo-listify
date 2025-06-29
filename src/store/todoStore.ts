import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Todo, TodoStatus } from "../types/todo";

interface TodoStore {
  todos: Todo[];
  addTodo: (todo: string) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  editTodo: (id: string, newTodo: string) => void;
  clearCompleted: () => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (todoText: string) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: crypto.randomUUID(),
              todo: todoText,
              date: new Date().toISOString(),
              status: "PENDING" as TodoStatus,
            },
          ],
        })),
      deleteTodo: (id: string) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      toggleTodo: (id: string) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? {
                  ...todo,
                  status:
                    todo.status === "PENDING"
                      ? "COMPLETED"
                      : ("PENDING" as TodoStatus),
                }
              : todo
          ),
        })),
      editTodo: (id: string, newTodo: string) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, todo: newTodo } : todo
          ),
        })),
      clearCompleted: () =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.status === "PENDING"),
        })),
    }),
    {
      name: "todo-storage",
    }
  )
);
