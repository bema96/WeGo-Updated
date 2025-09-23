// public/page.js
export const metadata = {
  title: "Forside",
  description: "Velkommen til forsiden af Mit Webshop. Find de bedste produkter og tilbud.",
  keywords: ["forside","webshop","tilbud","produkter","handel"],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

import FrontPage from "@/pages/FrontPage";

export default function Page() {
  return <FrontPage />;
}
