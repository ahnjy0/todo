"use client";

import { Filter } from "@/lib/types";

const filters: { label: string; value: Filter }[] = [
  { label: "전체", value: "all" },
  { label: "진행중", value: "active" },
  { label: "완료", value: "completed" },
];

interface Props {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
}

export default function FilterBar({ filter, onFilterChange }: Props) {
  return (
    <div className="flex w-fit gap-1 rounded-full bg-gray-100 p-1 mx-5 my-3">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onFilterChange(f.value)}
          className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 active:scale-95 ${
            filter === f.value
              ? "bg-white text-[#D97757] shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
