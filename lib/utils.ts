import { Priority, Todo } from "@/lib/types";

// 날짜 문자열을 보기 좋게 바꿔주는 함수
export function fd(d: string) {
  let result = "";
  const x = new Date(d);
  const y = x.getFullYear();
  let m = x.getMonth() + 1;
  let dd = x.getDate();
  if (m < 10) {
    result = result + y + "년 " + "0" + m + "월 ";
  } else {
    result = result + y + "년 " + m + "월 ";
  }
  if (dd < 10) {
    result = result + "0" + dd + "일";
  } else {
    result = result + dd + "일";
  }
  return result;
}

export const PRIORITY_LABEL: Record<Priority, string> = {
  high: "높음",
  medium: "보통",
  low: "낮음",
};

// Tailwind는 클래스 문자열이 소스에 그대로(리터럴로) 존재해야 인식하므로,
// hover: 등 variant가 붙은 클래스도 조합하지 않고 완성된 문자열로 둔다.
export const PRIORITY_COLOR: Record<
  Priority,
  { badge: string; selected: string; unselected: string }
> = {
  high: {
    badge: "bg-red-50 text-red-500",
    selected: "border-red-300 bg-red-50 text-red-500",
    unselected:
      "border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500",
  },
  medium: {
    badge: "bg-orange-50 text-[#D97757]",
    selected: "border-[#D97757] bg-orange-50 text-[#D97757]",
    unselected:
      "border-gray-200 text-gray-500 hover:border-[#D97757] hover:text-[#D97757]",
  },
  low: {
    badge: "bg-blue-50 text-blue-500",
    selected: "border-blue-300 bg-blue-50 text-blue-500",
    unselected:
      "border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-500",
  },
};

const PRIORITY_WEIGHT: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

// 마감일이 이른 순으로 정렬. 마감일이 없는 할일은 뒤로 보낸다.
export function sortByDueDate(todos: Todo[]) {
  return [...todos].sort((a, b) => {
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return a.dueDate.localeCompare(b.dueDate);
  });
}

// 우선순위 높음 -> 보통 -> 낮음 순으로 정렬
export function sortByPriority(todos: Todo[]) {
  return [...todos].sort(
    (a, b) => PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority],
  );
}

export function countRemaining(todos: Todo[]) {
  return todos.length;
}
