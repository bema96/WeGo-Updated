//pages/DetailPage.js
"use client";
// Imports
import { useTrips        } from "@/hooks/useTrips";
import { useReview       } from "@/hooks/useReview";
import { TripDetail      } from "@/components/_tripDetail/tripDetail";
import { ErrorMessage    } from "@/components/UI/Error.../ErrorMessage";
import { LoadingWavyDots } from "@/components/UI/Loading.../LoadingWavyDots";


export default function DetailPage({ id }) {
  // Hooks
  const { data:tripData,    loading:tripLoading,    error:tripError    } = useTrips(id);
  const { data:reviewData,  loading:reviewLoading,  error:reviewError  } = useReview(id);
  // Data sikring
  const trips    = Array.isArray(tripData)    ? tripData[0] : tripData;
  const reviews  = Array.isArray(reviewData)  ? reviewData  : [];
 
  // Loading & Error
  if (tripLoading || reviewLoading ) return <LoadingWavyDots text="Indlæser..." />;
  if (tripError   || reviewError   ) return <ErrorMessage message="Der opstod en fejl under hentning af data." />;


  return (

    <div className="max-w-7xl mx-auto px-4 pt-6 pb-30">

        <TripDetail 
          trip={trips}
          review={reviews} 
        />

    </div>
  );
};
