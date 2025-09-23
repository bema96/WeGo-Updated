//app/layout.js
export const metadata = {
  metadataBase: new URL("http://localhost:3000/"),  
  title: { template: "%s | Mit Webshop", default: "Mit Webshop" },
  description: "Public og privat dashboard eksempel",
  manifest: "/manifest.json",                   
};

import "@/styles/index.css";

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body>{children}</body>
    </html>
  );
}
