"use client";

import { useState } from "react";
import { Priority } from "@/lib/types";
import { PRIORITY_COLOR, PRIORITY_LABEL } from "@/lib/utils";

interface Props {
  onAdd: (input: { text: string; priority: Priority; dueDate?: string }) => void;
}

const priorities: Priority[] = ["high", "medium", "low"];

export default function TodoInput({ onAdd }: Props) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState("");

  const handleAdd = () => {
    onAdd({ text, priority, dueDate: dueDate || undefined });
    setText("");
    setPriority("medium");
    setDueDate("");
  };

  return (
    <div className="flex flex-col gap-3 border-b border-gray-100 p-5">
      <div className="flex gap-2">
        <input
          className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-[#D97757] focus:bg-white focus:ring-2 focus:ring-[#D97757]/20"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할일을 입력하세요"
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button
          onClick={handleAdd}
          className="rounded-lg bg-[#D97757] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#c96647] hover:shadow-md active:scale-95"
        >
          추가
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-600 outline-none transition-all duration-200 focus:border-[#D97757] focus:bg-white"
        />
        <div className="flex gap-1.5">
          {priorities.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200 active:scale-95 ${
                priority === p
                  ? PRIORITY_COLOR[p].selected
                  : PRIORITY_COLOR[p].unselected
              }`}
            >
              {PRIORITY_LABEL[p]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
