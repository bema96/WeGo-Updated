//components/list.js
"use client";
// Imports
import { Car         } from "@/assets/icons/car";
import { Pin         } from "@/assets/icons/pin";
import { Time        } from "@/assets/icons/time";
import { Avatar      } from "../_avatar/avatar";
import { Button      } from "../UI/UniversalButton/button";
import { dayLabel    } from "@/utils/dayLabel";
import { Location    } from "@/assets/icons/location";
import { GotoArrow   } from "@/assets/icons/arrowRight";
import { useRouter   } from "next/navigation";
import { StarRating  } from "../_starRating/rating";
import { calcAverage } from "@/utils/rating";


export const List = ({ result, review ,className }) => {
  // Roter
  const router = useRouter();


  return (

    <div className={`relative ${className}`}>
      
      <div className="flex flex-col gap-8">
        {result.map((trip) => (

          <article
            key={trip.id}
            className="flex flex-col gap-4 bg-white rounded-2xl shadow-md p-5"
          >
            {/* Dato / tid */}
            <ul className="flex items-center justify-between">
              <li className="flex items-center gap-2">
                <Time className="w-5 h-5 text-zinc-600" />
                <span className="font-medium">{dayLabel(trip.departureDate)}</span>
              </li>
              <li className="flex items-center gap-2 text-zinc-600">
                <Car className="w-14 h-full" aria-hidden />
              </li>
            </ul>

            {/* Afgang */}
            <ul className="flex justify-between border border-gray-300 py-3 px-4 rounded-full">
              <li className="flex items-center gap-2">
                <Location className="w-[25px] h-[25px]" />
                <span className="font-semibold">{trip.cityDeparture}</span>
              </li>
              <li className="pl-6 text-sm text-zinc-600">
                {trip.addressDeparture}
              </li>
            </ul>

            {/* Ankomst */}
            <ul className="flex justify-between border border-gray-300 py-3 px-4 rounded-full">
              <li className="flex items-center gap-2">
                <Pin className="w-[24px] h-[24px] pl-[2px]" />
                <span className="font-semibold">{trip.cityDestination}</span>
              </li>
              <li className="pl-6 text-sm text-zinc-600">
                {trip.addressDestination}
              </li>
            </ul>

            {/* Pris */}
            <ul className="flex justify-between border border-gray-300 py-3 px-4 rounded-full">
              <li className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-full bg-[var(--green)]" />
                <span className="inline-block w-3 h-3 rounded-full bg-[var(--green)]" />
                <span className="inline-block w-3 h-3 rounded-full bg-[var(--coral)]" />
              </li>
                <li className="font-semibold">DKK {trip.pricePerSeat}</li>
            </ul>
            
            {/* Andmeldelse */}
            <div className="relative rounded-full h-[80px] flex items-center justify-between overflow-hidden">

                <ul className="relative m-0 p-0 list-none flex items-center gap-3 h-full">
                    <Avatar className="h-full" imageUrl={trip.user?.imageUrl} />
                    <ul className="m-0 p-0 list-none">
                    <li className="text-lg font-semibold">{trip.user?.firstname}</li>
                    <StarRating value={calcAverage(review, trip.user?.id)} />
                    </ul>
                </ul>


                <Button 
                  className="relative rounded-full max-w-[70px] h-[70px] flex items-center justify-center" 
                  variant="primary"
                  onClick={() => router.push(`/list/${trip.id}`)}
                  >
                    <GotoArrow className="h-7 pl-1" />
                </Button>
            </div>


          </article>
        ))}
      </div>
    </div>
  );
};
