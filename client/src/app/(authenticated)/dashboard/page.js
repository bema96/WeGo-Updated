export const metadata = {
  title: "Dashboard | Mit Next Projekt",
  description: "Se dit personlige dashboard og få overblik over din konto og aktiviteter.",
  keywords: ["dashboard", "konto", "overblik", "aktiviteter", "nextjs"],
  robots: "index, follow",
};



import DashboardPage from "@/pages/_private/dashboardPage";

export default function Page() {
  return (
    <>
    <DashboardPage />
    </>
  );
}