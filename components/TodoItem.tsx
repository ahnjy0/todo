"use client";

import { Todo } from "@/lib/types";
import { fd, PRIORITY_COLOR, PRIORITY_LABEL } from "@/lib/utils";
import Checkbox from "./Checkbox";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D97757]/25 hover:shadow-md">
      <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p
            className={`truncate transition-colors duration-200 ${
              todo.completed ? "text-gray-400 line-through" : "text-gray-800"
            }`}
          >
            {todo.text}
          </p>
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${PRIORITY_COLOR[todo.priority].badge}`}
          >
            {PRIORITY_LABEL[todo.priority]}
          </span>
        </div>
        <span className="text-xs text-gray-400">
          {fd(todo.createdAt)}
          {todo.dueDate && ` · 마감 ${fd(todo.dueDate)}`}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="shrink-0 rounded-md px-2 py-1 text-sm text-gray-400 transition-colors duration-200 hover:bg-red-50 hover:text-red-500"
      >
        삭제
      </button>
    </li>
  );
}
