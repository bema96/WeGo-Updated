//components/_tripDetail/anmeldelse.js
"use client"
// Imports
import { Button      } from "@/components/UI/UniversalButton/button";
import { Avatar      } from "@/components/_avatar/avatar";
import { StarRating  } from "@/components/_starRating/rating";
import { calcAverage } from "@/utils/rating";
import { MessageIcon } from "@/assets/icons/message";


export const Reviews = ({ trip, review }) => {
  
  const reviews = Array.isArray(review)
    ? review.filter(res => res?.reviewedUserId === trip.userId)
    : [];


  return (

    <div>
      <h1 className="font-semibold text-2xl py-5">Chaufførens kommentar</h1>

      <div className="bg-white p-5 rounded-2xl min-h-[150px]">
        <div className="relative rounded-full h-[80px] flex items-center justify-between overflow-hidden">
          <ul className="relative m-0 p-0 list-none flex items-center gap-3 h-full">
            <Avatar className="h-full" imageUrl={trip.user?.imageUrl} />
            <ul className="m-0 p-0 list-none">
              <li className="text-2xl font-semibold">{trip.user?.firstname}</li>
              <StarRating value={calcAverage(review, trip.userId)} />
            </ul>
          </ul>

          <Button className="relative bg-[var(--sky)] flex items-center justify-center rounded-full h-full w-20" variant="primary">
            <MessageIcon className="w-10" />
          </Button>
        </div>

        
        <div className="mt-4 space-y-3">
          {reviews.length === 0 ? (

            <p className="text-sm text-gray-500">Ingen anmeldelser endnu.</p>

          ) : (

            reviews.map(res => (
              <div key={res.id} className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
                <div className="flex-1">
                  <span className="font-semibold">{res.reviewer?.firstname}</span>
                  <div className="flex items-center gap-2">
                    <StarRating value={res.numStars ?? 0} />
                    <span>
                    {new Date(res.createdAt).toLocaleTimeString("da-DK", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: "Europe/Copenhagen",
                    })}
                    </span>

                  </div>
                  <p className="text-sm text-gray-700 mt-1">{res.comment}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
