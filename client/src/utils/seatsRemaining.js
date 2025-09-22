// utils/seatsRemaining.js
export const SeatsRemaining = (trip, bookings) => {
  const total  = trip?.seatsTotal;
  const tripId = trip?.id;

  const booked = bookings
    .filter(booking => booking.tripId === tripId)
    .reduce((sum, booking) => sum + (booking.seats || 0), 0);

  return total - booked;
};
