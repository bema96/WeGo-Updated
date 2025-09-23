//components/_tripDetail/time&date.js
"use client"

export const TimeDate = ({ trip }) => {
    const d = new Date(trip.departureDate);

    return(
        
        <div className="flex flex-col gap-4">
            <div>
                <h1 className="font-semibold text-2xl">{trip.cityDeparture} til {trip.cityDestination}</h1>
                <span className="font-medium">
                <span className="capitalize">{d.toLocaleDateString("da-DK", { weekday: "long" })}</span>{" "}
                d.{" "}
                {d.toLocaleDateString("da-DK", { day: "2-digit", month: "long", year: "numeric" })}
                </span>
            </div>

            <div className="flex justify-between gap-3">
                <div className="flex bg-white justify-between w-full py-4 px-3 rounded-full">
                    <p className="font-semibold text-lg">Afgang:</p>
                    <span className="text-white bg-[var(--sky)] px-5 py-1 rounded-full">
                    {new Date(trip.departureDate).toLocaleTimeString("da-DK",{hour:"2-digit",minute:"2-digit"})}
                    </span>
                </div>
            </div>
        </div>
    );
};