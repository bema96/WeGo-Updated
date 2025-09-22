// app/(public)/booking/[id]/page.jsx
export async function generateMetadata({ params }) {
  const { id } = await params;

  return {
    title: `Køreture | Book lift #${id}`,
    description: `Book lift for tur ${id}`,
    alternates: { canonical: `https://ditdomæne.dk/booking/${id}` },
  };
}

import BookingPage from "@/pages/BookingPage";

export default async function Page({ params }) {
  const { id } = await params; 
  
  return <BookingPage id={id} />;
}
