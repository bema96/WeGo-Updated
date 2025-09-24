// utils/seatsRemaining.js
export const SeatsRemaining = (trip, bookings) => {
  const total  = trip?.seatsTotal;
  const tripId = trip?.id;

  const booked = bookings
    .filter(booking => booking.tripId === tripId)
    .reduce((sum, booking) => sum + (booking.seats || 0), 0);

  return total - booked;
};


// Beregn resterende pladser for en given tur baseret på dens samlede pladser og eksisterende bookinger

/*
Tekniske begreber:

=>           - arrow function

?.           - optional chaining operator

.filter()    - Array-metode (immutabel)

===          - strict equality (samme værdi og type)

.reduce()    - Array-akkumulation med startværdi 0

||           - logical OR (fallback til 0)

-            - aritmetik: total minus sum af bookede sæder

*/
