// app/(public)/list/page.js
import { Suspense } from "react";
import ListPage from "@/pages/ListPage";

export const metadata = {
  title: "Køreture | Søg lifte",
  description: "Se ledige køreture og søg efter et lift fra A til B. Filtrér efter fra/til, dato og pris.",
  keywords: ["køreture", "samkørsel", "lift", "find lift", "søg køretur", "bilpool"],
  robots: "index, follow",
  alternates: { canonical: "/list" },
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ListPage />
    </Suspense>
  );
}
