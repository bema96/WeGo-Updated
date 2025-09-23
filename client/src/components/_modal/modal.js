// components/Modal.jsx
"use client";
// Imports
import { Button } from "../UI/UniversalButton/button";


export const Modal = ({ open, onClose, title = "Beskrivelse", children }) => {
  if (!open) return null;

  return (
    
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* box */}
      <div className="relative z-[100000] w-[92vw] max-w-md rounded-2xl bg-white p-5 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold">{title}</h2>

          <Button
            onClick={onClose}
            aria-label="Luk"
            className="rounded-full px-3 py-1 bg-gray-100 hover:bg-gray-200"
          >
            X
          </Button>
        </div>

        <div className="mt-3 text-sm text-gray-700">{children}</div>
      </div>
    </div>
  );
};


// Named arrow function med props-destructuring fra parent-komponenten. 
// Simpel modal der tjekker om den skal vises (open) eller (onClose).

// Children prop til at bestemme indhold i modal udefra. Det gør den genbrugelig.