export const metadata = {
  title: "Køreture | Søg lifte",
  description: "Se ledige køreture og søg efter et lift fra A til B. Filtrér efter fra/til, dato og pris.",
  keywords: ["køreture", "samkørsel", "lift", "find lift", "søg køretur", "bilpool"],
  robots: "index, follow",
  alternates: {
    canonical: "/list",
  },
};



import ListPage from "@/pages/ListPage";

export default function Page() {
    
    return (
      <>
      <ListPage  />
      </>
    )
}
