//public/signup/page.js
export const metadata = {
  title: "Opret bruger | Mit Next Projekt",
  description: "Opret en ny bruger og få adgang til alle funktioner på websitet.",
  keywords: ["signup", "opret bruger", "registrering", "konto", "nextjs"],
  robots: "index, follow",
};

import SignupPage from "@/pages/SignupPage";

export default function Page() {
  return (
    <>
    <SignupPage />
    </>
  );
}