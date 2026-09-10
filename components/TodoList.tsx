"use client";

import { Todo } from "@/lib/types";
import TodoItem from "@/components/TodoItem";

interface Props {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete }: Props) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 px-4 py-16 text-center">
        <span className="text-4xl">🗒️</span>
        <p className="text-sm text-gray-400">표시할 할일이 없어요</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2 px-5 pb-5">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
