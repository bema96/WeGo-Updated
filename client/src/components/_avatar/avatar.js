//components/avatar.js
"use client"
// Imports
import { AvatarIcon } from "@/assets/icons/avatar";


export const Avatar = ({ imageUrl, className }) => {
  
  return (

    <div className={className}>
      <div className="rounded-full overflow-hidden box-border border-2 border-gray-400 aspect-square h-full w-full shrink-0">
        
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="profile"
            className="block w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full">
            <AvatarIcon width="100%" height="100%" />
          </div>
        )}
      </div>
    </div>
  );
};

// Dette er avatar komponent til at toggle mellem brugerens profilbillede og standar default avatar ikon.
// Hvis der er et imageUrl, vises billedet, ellers vises et standard avatar ikon.

// Named arrow function component med props destructuring.
// Betinget rendering med ternaery operator for at vælge mellem brugerens billede og standardikonet.