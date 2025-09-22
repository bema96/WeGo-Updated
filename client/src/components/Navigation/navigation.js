// components/Navigation.jsx
"use client";
// Imports
import { Modal               } from "@/components/_modal/modal";
import { useAuth             } from "@/providers/auth.provider";
import { useState            } from "react";
import { MobileNavigation    } from "./MobileNavigation";
import { DesktopNavigation   } from "./DesktopNavigation";
import "./hamburgerMenu.css";


export const Navigation = () => {

  // Hooks
  const { loginData } = useAuth();
  // Menu states
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  // Modal handlers
  const openModal  = () => setOpen(true);
  const closeModal = () => setOpen(false);


  return (
  <>
      <nav className="bg-[var(--gray)] text-[var(--gral)] text-sm h-[120px] flex items-center py-4 px-6 shadow-md">

        {/* Mobil navigation */}
        <div className="block md:hidden w-full">
          <MobileNavigation
            loginData={loginData}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            onHowItWorks={openModal}
          />
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:block w-full">
          <DesktopNavigation
            loginData={loginData}
            onHowItWorks={openModal}
          />
        </div>
      </nav>

      {/* Modal - Sådan virker det */}
      <Modal open={open} onClose={closeModal} title="Sådan virker det">
        <p>Samkørsel: én kører, andre hopper med, og alle sparer tid og penge. Søg på fra/til og dato, vælg en tur, book et sæde, og bekræft mødested og tidspunkt i chatten (kom fem minutter før).</p>
        <br />
        <p>Betalingen dækker brændstof og evt. bro/færge og fordeles fair. Tjek bagage, kæledyr, rygning, musik/stille og rating. Aflys i god tid og giv en kort, ærlig anmeldelse.</p>
        <br />
        <p>Hold bilen pæn, spørg før mad, brug sele, respekter tempo. Chaufføren har ansvar; platformen forbinder jer. Forvent lovlig/forsikret bil. Klar kommunikation = chill tur.</p>
      </Modal>
  </>
  );
};
