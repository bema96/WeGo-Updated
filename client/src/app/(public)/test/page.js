// app/meta-test/page.js
export const metadata = {
  title: "META TEST",
  description: "Det her SKAL være synligt",
  alternates: { canonical: "/meta-test" },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <div>Hej fra META TEST</div>;
}
