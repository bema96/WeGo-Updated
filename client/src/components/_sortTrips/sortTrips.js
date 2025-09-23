// components/sortTrips.js
"use client"
// Imports
import { PrefsFilter   } from "@/components/_sortTrips/_prefsFilter/preference";
import { SeatsFilter   } from "@/components/_sortTrips/_seatsFilter/seats";
import { BaggageFilter } from "@/components/_sortTrips/_bagageFilter/bagage";


export const SortTrips = ({ value = { selectedFilter: "", bagSizeId: "" ,pref: [] }, onChange, bagSizes, className }) => (

  <div className={`bg-white px-5 rounded-2xl flex flex-col gap-4 ${className}`}>
    <SeatsFilter
      value={value.seats}
      onChange={(seat) => onChange?.({ selectedFilter: "seats", seats: seat })}
    />

    <BaggageFilter
      options={bagSizes}
      value={value.bagSizeId}
      onChange={(bagSizeId) => onChange?.({ selectedFilter: "bagage", bagSizeId })}
    />

    <PrefsFilter
      value={value.pref}
      onChange={(pref) => onChange?.({ selectedFilter: "preference", pref })}
    />
  </div>
);

