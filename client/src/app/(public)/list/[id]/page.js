// public/list/[id]/page.js
export async function generateMetadata({ params }) {
  const { id } = await params; 

  return {
    title: `Køretur ${id}`,
    description: `Detaljer for køretur ${id}`,
    robots: { index: true, follow: true },
    alternates: { canonical: `https://ditdomæne.dk/list/${id}` },
  };
}

import DetailPage from "@/pages/DetailPage";

export default function Page({ params }) {
  const { id } = params; 
  
  return <DetailPage id={id} />;
}
