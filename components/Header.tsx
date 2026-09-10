import { Todo } from "@/lib/types";
import { countRemaining } from "@/lib/utils";

export default function Header({ todos }: { todos: Todo[] }) {
  return (
    <header className="border-b border-gray-100 bg-gradient-to-br from-orange-50/60 to-white px-5 py-6">
      <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-gray-900">
        <span className="inline-block h-6 w-1.5 rounded-full bg-[#D97757]" />
        오늘의 할 일
      </h1>
      <p className="mt-1.5 text-sm text-gray-500">
        남은 할 일{" "}
        <span className="font-semibold text-[#D97757]">
          {countRemaining(todos)}
        </span>
        개
      </p>
    </header>
  );
}
