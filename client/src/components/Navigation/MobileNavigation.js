// components/MobileNavigation.jsx
"use client";
// Imports
import { Button        } from "@/components/UI/UniversalButton/button";
import { Avatar        } from "../_avatar/avatar";
import { slide as Menu } from "react-burger-menu";
import Link from "next/link";


export const MobileNavigation = ({ loginData, menuOpen, setMenuOpen, onHowItWorks }) => {

  const closeMenu = () => setMenuOpen(false);

  return (

    <div className="flex w-full items-center justify-between">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <img src="/WeGo.svg" alt="Logo" width={100} />
      </Link>

      {/* Avatar & username */}
      <div className="relative flex items-center gap-8">
        
        <div className="flex justify-center items-center gap-3">
          {/* username */}
          {loginData && (
          <div className="flex flex-col text-xs opacity-80">
            <span className="flex justify-end">Velkommen</span>
            <span className="font-bold flex justify-end">{loginData?.user?.firstname}</span>
          </div>
          )}
          {/* avatar */}
          <Link href="/dashboard">
            <Avatar imageUrl={loginData?.user?.imageUrl} className="w-13" />
          </Link>
        </div>

        {/* React Burger Menu */}
        <Menu
          right
          isOpen={menuOpen}
          onStateChange={(state) => setMenuOpen(state.isOpen)}
          customCrossIcon={
            <Button
              aria-label="Luk menu"
              className="text-5xl absolute text-white top-4 right-5 bg-transparent border-none cursor-pointer"
              onClick={closeMenu}
            >
              &times;
            </Button>
          }
        >
    
          {/* Link til listPage */}
          <Link href="/list" onClick={closeMenu} className="mb-4 block">
            Find et Lift
          </Link>

          {/* Knap til "Sådan virker det" */}
          <button
            type="button"
            onClick={() => {
              closeMenu();
              onHowItWorks?.();
            }}
            className="block text-left"
          >
            Sådan virker det
          </button>
        </Menu>
      </div>
      
    </div>
  );
};
