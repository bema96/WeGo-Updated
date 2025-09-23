//components/UI/ErrorMessage.js
"use client";
// Imports
import { Button } from "../UniversalButton/button";
import { useRouter } from "next/navigation";

export function ErrorMessage() {
  const router = useRouter();

  return (

    <div className="pointer-events-none flex-col fixed inset-0 -z-50 flex items-center justify-center bg-white">

      <img
        src="/Error404.png"
        alt="404"
        className="h-auto object-contain opacity-50"
      />
      <Button
      variant="primary"
      className="py-2 px-8"
      onClick={() => router.push("/")}
      >
        Gå tilbage
      </Button>

    </div>
  );
}
