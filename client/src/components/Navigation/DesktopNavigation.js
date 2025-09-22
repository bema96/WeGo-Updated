// components/DesktopNavigation.jsx
"use client";
// Imports
import { Button } from "@/components/UI/UniversalButton/button";
import { Avatar } from "../_avatar/avatar";
import Link from "next/link";


export const DesktopNavigation = ({ loginData, onHowItWorks }) => {

  return (

    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-10">
        <Link href="/" className="flex items-center gap-2 mr-5">
          <img src="/WeGo.svg" alt="Logo" width={120} />
        </Link>

        {/* Navigate til listPage */}
        <Link href="/list" className="hover:underline"
        >
          Find et Lift
        </Link>

        {/* Knap til "Sådan virker det" */}
        <Button type="button" onClick={onHowItWorks} className="hover:underline"
        >
          Sådan virker det
        </Button>
      </div>

      {/* Avatar & username */}
      <div className="flex gap-5 items-center">
        {/* Username */}
        <div className="flex flex-col text-xs opacity-80 absolute right-23 top-8">
          <span className="flex justify-end">Velkommen</span>
          <span className="font-bold flex justify-end">{loginData?.user?.firstname}</span>
        </div>
        {/* Avatar */}
        <Link href="/dashboard">
          <Avatar imageUrl={loginData?.user?.imageUrl} className="w-13" />
        </Link>
      </div>
    </div>
  );
};
