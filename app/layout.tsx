import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "진영이 일정표",
  description: "할일을 관리하는 미니 앱",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <main className="flex min-h-screen w-screen items-start justify-center bg-gradient-to-b from-orange-50/40 via-gray-50 to-gray-100 px-4 py-10 sm:items-center">
          <div className="relative flex w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-xl shadow-gray-200/70 ring-1 ring-gray-100">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
