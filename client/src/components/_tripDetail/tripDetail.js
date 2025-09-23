"use client";

import { Button      } from "../UI/UniversalButton/button";
import { Comment     } from "./_DriverComments/comment";
import { Reviews     } from "./_Andmeldelse/anmeldelse";
import { TimeDate    } from "./_Time&Date/time&date";
import { useRouter   } from "next/navigation";
import { Information } from "./_Information/information"; 


export const TripDetail = ({ trip, review, className }) => {
    // Router
    const router = useRouter();

    
    if (!trip) return <div>Kunne ikke finde turen</div>; 

    return (
        <div className={`relative mb-20 ${className} lg:flex flex-row-reverse gap-15 justify-center items-start`}>

            <div className="lg:mt-5 lg:w-1/3">
                <TimeDate
                trip={trip} 
                />
            </div>

            <div className="flex-1 space-y-5 lg:pr-10">
                <div>
                    <Information
                    trip={trip} 
                    />
                </div>

                <div>
                    <Comment
                    trip={trip} 
                    />
                </div>

                <div>
                    <Reviews 
                    trip={trip}
                    review={review}s
                    />
                </div>
                
                <Button
                    onClick={() => router.push(`/booking/${trip.id}`)}
                    variant="primary"
                    className="w-full py-3"
                >
                    Book plads
                </Button>
            </div>
        </div>
    );
};

