// public/login/page.js
export const metadata = {
  title: "Login | Mit Next Projekt",
  description: "Log ind på din konto og få adgang til alle funktioner på websitet.",
  keywords: ["login", "log ind", "konto", "adgang", "nextjs"],
  robots: "index, follow",
};

import LoginPage from "@/pages/LoginPage";

export default function Page() {
  
  return (
    <>
    <LoginPage />
    </>
  );
}