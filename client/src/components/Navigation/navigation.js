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
  // Modal håndtering
  const openModal  = () => setOpen(true);
  const closeModal = () => setOpen(false);


  return (
  <>
      <nav className="bg-[var(--gray)] text-[var(--gral)] text-sm h-[120px] flex items-center py-4 px-6 shadow-md">

        {/* Mobil navigation */}
        <div className="block lg:hidden w-full">
          <MobileNavigation
            loginData={loginData}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            onHowItWorks={openModal}
          />
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:block w-full">
          <DesktopNavigation
            loginData={loginData}
            onHowItWorks={openModal}
          />
        </div>
      </nav>

      {/* Modal - Sådan virker det */}
      <Modal open={open} onClose={closeModal} title="Sådan virker det">
            <p>
              Søg hvor du skal fra og til, vælg dato, find en tur der matcher pris og tidspunkt, og book. 
              Hop i chatten med chaufføren, få mødested og tid på plads, og sig hvis du har præferencer (musik/stille, pause, bagage). 
              Mød op fem minutter før og vær nem at finde. Prisen dækker benzin (+ evt. bro/færge) og deles fair mellem jer – ingen skjulte ting. 
              Tjek regler: hvor meget bagage, kæledyr ok eller ej, rygepolitik. Bliver planen ændret, så meld afbud i god tid. 
              Efter turen: giv en kort, ærlig anmeldelse, så andre ved, hvad de går ind til. 
              Det handler bare om klar besked, respekt i bilen og en billigere, grønnere tur.
            </p>
      </Modal>
  </>
  );
};
