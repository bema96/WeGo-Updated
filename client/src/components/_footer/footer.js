// components/Footer.jsx
"use client";
// Imports
import { usePathname } from "next/navigation";
import { FooterDesktop } from "@/assets/images/footerdesktop";
import { FooterMobile }  from "@/assets/images/footermobile";

export const Footer = () => {
  
  const path = usePathname();
  const isFrontpage = path === "/";

  return (

    <footer className="relative -bottom-1 z-0 w-full">
      
      {/* Mobil */}
      <div className="absolute w-full bottom-0 flex lg:hidden">
        <FooterMobile className="w-full" />
      </div>
     

      {/* Desktop */}
      {!isFrontpage && (
        <div className="lg:block overflow-visible">
          <FooterDesktop className="w-full h-auto lg:-mt-12" />
        </div>
      )}
    </footer>
  );
};

// Named arrow-function med visning af to slags størrelser af images alt efter viewport.
// vi bruger usePathname til at tjekke om vi er på forsiden. I dette tilfælde vil vi ikke vise desktop versionen af footeren.

// usePathname er en hook

// === - strict equality operator. Tjekker om type og værdi er ens.