//pages/BookingPage.js
"use client"
// Imports
import { useState                     } from "react";
import { useBooking                   } from "@/hooks/useBooking";       
import { useBookATrip                 } from "@/hooks/useBookATrip";    
import { useTrips                     } from "@/hooks/useTrips";
import { useAuth                      } from "@/providers/auth.provider";
import { SeatsRemaining               } from "@/utils/seatsRemaining";
import { BookTrip                     } from "@/components/_bookTrip/bookTrip";
import { ErrorMessage                 } from "@/components/UI/Error.../ErrorMessage";
import { LoadingWavyDots              } from "@/components/UI/Loading.../LoadingWavyDots";


export default function BookingPage({ id }) {
  // States
  const [seats,   setSeats  ] = useState();
  const [message, setMessage] = useState();
  const [success, setSuccess] = useState();
  const [error,   setError  ] = useState();
  
  // Hooks
  const { data: tripData,    loading: tripLoading,    error: tripError    } = useTrips(id);
  const { data: bookingData, loading: bookingLoading, error: bookingError } = useBooking();
  const { book,              loading: postLoading,    error: postError    } = useBookATrip();
  // Data sikring
  const trip     = Array.isArray(tripData)    ? tripData[0] : (tripData ?? null);
  const bookings = Array.isArray(bookingData) ? bookingData : [];
  // Auth
  const auth = useAuth();
  const loginData = auth?.loginData;
  const authLoading = auth?.loading;

  // Beregning
  const seatsRemaining = SeatsRemaining(trip, bookings);
  const maxSeats       = seatsRemaining      || trip?.seatsTotal || 0;
  const totalPrice     = (trip?.pricePerSeat || 0)    *   (seats || 1);

  // Sæde håndtering 
  const handleSeats = async (n) => {
    setSeats(n || 1);
  }

  // Submit håndtering
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginData || !trip || maxSeats === 0) return;

    const response = await book({
      tripId: trip.id,
      numSeats:  seats || 1,
      comment: message || "",
    })
    if (response?.id) {
      setSuccess("Din booking er gennemført!");
    } else {
      setError("Booking mislykkedes.");
    }
  };

  // Loading & Error
  if (tripLoading || bookingLoading || postLoading || authLoading) return <LoadingWavyDots text="Indlæser..." />;
  if (tripError   || bookingError   || postError                 ) return <ErrorMessage message="Error fetching trip" />;



  return (
    <div className="max-w-sm mx-auto">

      {success && (
        <div className="mb-3 rounded-xl bg-green-100 text-green-800 px-3 py-2 text-sm">
          {success}
        </div>
      )}
      {error && (
        <div className="mb-3 rounded-xl bg-red-100 text-red-800 px-3 py-2 text-sm">
          {error}
        </div>
      )}

      {!loginData && (
        <div className="mb-3 mt-4 rounded-xl bg-yellow-50 text-yellow-800 px-3 py-2 text-xs">
          <p>Log ind for at kunne fuldføre bookingen.</p>
        </div>
      )}

      <BookTrip
        trip={trip}
        maxSeats={maxSeats}
        seats={seats}
        message={message}
        totalPrice={totalPrice}
        onSeatsChange={handleSeats}
        onMessageChange={setMessage}
        onBack={() => history.back()}
        onSubmit={handleSubmit}
      />

    </div>
  );
}
