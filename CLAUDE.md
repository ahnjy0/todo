# CLAUDE.md

이 파일은 이 저장소에서 작업하는 Claude Code(claude.ai/code)에게 제공되는 가이드입니다.

## 명령어

```bash
npm run dev      # 개발 서버 실행 (Next.js, http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 빌드 실행
npm run lint     # ESLint (flat config, eslint.config.mjs)
```

이 프로젝트에는 테스트 러너가 설정되어 있지 않습니다 (test 스크립트 없음, devDependencies에도 테스트 프레임워크 없음).

## 아키텍처

Next.js App Router 프로젝트(Next 16, React 19, TypeScript, Tailwind CSS 4)로, 한글 UI로 구성된 단일 페이지 할일 목록 앱("오늘의 할일")입니다. 모든 UI 텍스트가 한글입니다.

- `app/page.tsx`는 클라이언트 컴포넌트(`"use client"`)로, `useState<Todo[]>`를 통해 모든 할일 상태를 관리하며 `lib/mock-data.ts`의 데이터로 초기화됩니다. 영속성 레이어가 없어(localStorage, API, DB 없음) 새로고침할 때마다 상태가 초기화됩니다. 모든 변경 핸들러(`addTodo`, `toggleTodo`, `deleteTodo`)가 이 파일 하나에 모여 있고 props로 하위 컴포넌트에 전달되며, context나 별도 상태관리 라이브러리는 사용하지 않습니다.
- `app/layout.tsx`는 루트 레이아웃으로, 모든 페이지가 그 안에서 렌더링되는 가운데 정렬된 `max-w-md` 카드 레이아웃을 정의합니다.
- `lib/types.ts`는 핵심 타입들을 정의합니다: `Todo`(`dueDate?`, `priority` 포함), `Filter`(`"all" | "active" | "completed"`), `Priority`(`"high" | "medium" | "low"`).
- `lib/utils.ts`에는 작은 헬퍼 함수들이 있습니다: `fd`(날짜 포맷팅), `sortByDueDate`/`sortByPriority`(정렬, 각각 마감일 없음/낮은 우선순위를 뒤로 보냄), `PRIORITY_LABEL`(우선순위 한글 라벨), `countRemaining`.
- `components/`는 중첩 없이 평평한 구조로, 각 컴포넌트는 `page.tsx`로부터 데이터/콜백을 props로 받는 프레젠테이션 컴포넌트입니다: `Header`(남은 개수 표시), `TodoInput`(추가 폼), `FilterBar`(필터 버튼), `TodoList`/`TodoItem`(목록 렌더링), `Checkbox`(커스텀 체크박스 버튼).

### 아직 연결되지 않은 부분

일부 UI는 존재하지만 기능적으로 연결되어 있지 않습니다 — 이 프로젝트는 강의용 스타터 프로젝트이므로, 미완성/버그가 있는 코드가 실습을 위해 의도적으로 남겨진 시작점일 수 있습니다. 요청받지 않았다면 임의로 "고치지" 말 것:

- `lib/utils.ts`의 `countRemaining`은 (미완료 할일 개수가 아니라) `todos.length`(전체 개수)를 반환하는데, `Header`에서는 이 값을 "남은 할일" 개수로 표시하고 있습니다.
- `page.tsx`의 `addTodo`에 지우지 않은 `console.log`가 남아 있습니다.

`FilterBar`는 `filter`/`onFilterChange` props로 `app/page.tsx`의 `filter` 상태와 연결되어 있으며, `page.tsx`가 `filteredTodos`를 계산해 `TodoList`에 전달합니다 (단, `Header`의 남은 개수 표시는 필터와 무관하게 필터링 전 전체 `todos`를 기준으로 합니다).

`page.tsx`는 필터링된 목록을 `lib/utils.ts`의 `sortByDueDate`로 정렬해 항상 마감일이 이른 순으로 보여줍니다(마감일이 없는 항목은 뒤로 밀림). `TodoInput`에서 할일 추가 시 마감일(`dueDate`, 선택)과 우선순위(`priority`, 기본값 `medium`)를 함께 입력받아 `onAdd`로 전달하며, `TodoItem`은 우선순위 배지와 마감일을 함께 표시합니다. `sortByPriority`는 아직 UI에서 사용되지 않는 별도 헬퍼입니다.

### 스타일 컨벤션

Tailwind 유틸리티 클래스를 전체적으로 인라인으로 사용하며, 브랜드 강조 색상 `#D97757`이 Tailwind 테마 토큰이나 CSS 변수로 정의되지 않고 여러 곳에 하드코딩되어 있습니다. `.prettierrc`는 큰따옴표, 세미콜론, trailing comma를 강제합니다.
