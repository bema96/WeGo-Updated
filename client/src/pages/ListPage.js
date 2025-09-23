// pages/ListPage.js
"use client";
// Imports
import { useState        } from "react";
import { useTrips        } from "@/hooks/useTrips";
import { useReview       } from "@/hooks/useReview";
import { useBagsize      } from "@/hooks/useBagsize";
import { useRouter       } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { SearchLift      } from "@/components/_search/searchLift";
import { SearchTrips     } from "@/utils/searchTrips";
import { SortTrips       } from "@/components/_sortTrips/sortTrips";
import { applyFilters    } from "@/utils/applyFilters";
import { List            } from "@/components/_tripList/list";

import { LoadingWavyDots } from "@/components/UI/Loading.../LoadingWavyDots";
import { ErrorMessage    } from "@/components/UI/Error.../ErrorMessage";



export default function ListPage() {
  // Navigation
  const params = useSearchParams();
  const router = useRouter();

  // URL input værdier - styrer input
  const [fromInput, setFromInput] = useState(() => params.get("from"));
  const [toInput,   setToInput  ] = useState(() => params.get("to"));

  // Søge værdier - styrer filtreringen
  const [queryFrom, setQueryFrom] = useState(() => params.get("from"));
  const [queryTo,   setQueryTo  ] = useState(() => params.get("to"));

  // Filter states
  const [filters, setFilters] = useState({ selectedFilter: "", seats: 1, bagSizeId: null, pref: [] });

  // Hooks
  const { data: tripData,     loading: tripLoading, error: tripError       } = useTrips();
  const { data: reviewData,   loading: reviewLoading, error: reviewError   } = useReview();
  const { data: bagSizesData, loading: bagSizeLoading, error: bagSizeError } = useBagsize();
  // Data sikring
  const trips    = Array.isArray(tripData)     ? tripData     : [];
  const reviews  = Array.isArray(reviewData)   ? reviewData   : [];
  const bagSizes = Array.isArray(bagSizesData) ? bagSizesData : [];

  // Filtererede resultater baseret på søgning
  const textResults = SearchTrips(trips, queryFrom, queryTo);
  // endelig filtreret resultat søgning + filters
  const results = applyFilters(textResults, filters);


  // Opdater quary og pusher til URL
  function handleSubmit(e) {
    e.preventDefault();
    setQueryFrom(fromInput);
    setQueryTo(toInput);
    const params = new URLSearchParams({ from: fromInput, to: toInput });
    router.push(`/list?${params}`);
  }

  // Loading & Error
  if (tripLoading || reviewLoading || bagSizeLoading) return <div><LoadingWavyDots text="Indlæser..." /></div>;
  if (tripError   || reviewError   || bagSizeError  ) return <div><ErrorMessage message="Der opstod en fejl under hentning af data." /></div>;



  return (

    <div className="max-w-7xl mx-auto px-4 pt-6 pb-30">
      
      <h1 className="font-bold text-3xl lg:hidden mb-3"
      >Find et lift</h1>

      {/* Søgningsfelt */}
      <SearchLift
        from={fromInput}
        to={toInput}
        onFrom={setFromInput}
        onTo={setToInput}
        onSubmit={handleSubmit}
        className="lg:w-full"
      />

    
      <div className="mt-6 flex flex-col gap-5 lg:mt-10 lg:flex-row lg:items-start lg:gap-8">
        {/* Filtrering */}
        <SortTrips
          value={filters}
          onChange={(patch) => setFilters((prev) => ({ ...prev, ...patch }))}
          bagSizes={bagSizes}
          className="mt-4 lg:mt-0 lg:w-64 lg:shrink-0 lg:sticky lg:top-24"
        />
        {/* Resultat liste */}
        <div className="flex-1">
          <h2 className="font-bold text-3xl hidden lg:block mb-4"
          >Næste lift</h2>
          <div className="grid gap-3 sm:gap-4">
            <List 
            result={results} 
            review={reviews} 
            />
          </div>
        </div>

      </div>
    </div>
  );
};
