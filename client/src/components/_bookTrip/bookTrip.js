// components/_bookTrip/bookTrip.jsx
"use client";
// Imports
import { dayLabel } from "@/utils/dayLabel";
import { Button } from "../UI/UniversalButton/button";

export const BookTrip = ({ trip, maxSeats, seats, message, totalPrice, onSeatsChange, onMessageChange, onSubmit, onBack }) => {
  
  // Viser antal pladser i dropdown
  const seat = [];
  for (let i = 1; i <= maxSeats; i++) {
    seat.push(<option key={i} value={i}>{i}</option>);
  }

  return (

    <form className="p-4 space-y-4 max-w-sm mx-auto" onSubmit={onSubmit}>
      
      {/* Pladser */}
      <div className="space-y-1">
        <label className="text-sm">Pladser</label>
        <select
          className="w-full rounded-xl border p-3"
          value={seats}
          onChange={(e) => onSeatsChange(Number(e.target.value))}
          disabled={maxSeats === 0}
          name="seats"
        >
          {seat}
        </select>
      </div>

      {/* Besked */}
      <div className="space-y-1">
        <label className="text-sm">Besked til chauffør</label>
        <textarea
          className="w-full rounded-xl border p-3 min-h-24"
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="Evt. afhentningsdetaljer…"
          name="comment"
        />
      </div>

      {/* Betaling (dummy) */}
      <div className="space-y-2">
        <div className="space-y-1">
          <label className="text-sm">Kortnummer</label>
          <input
            className="w-full rounded-xl border p-3"
            placeholder="1234 1234 1234 1234"
            inputMode="numeric"
            name="cardNumber"
          />
        </div>

        <div className="flex gap-2">
          <div className="flex-1 space-y-1">
            <label className="text-sm">Udløbsdato</label>
            <input
              className="w-full rounded-xl border p-3"
              placeholder="MM/ÅÅ"
              inputMode="numeric"
              name="exp"
            />
          </div>
          <div className="flex-1 space-y-1">
            <label className="text-sm">CVC-kode</label>
            <input
              className="w-full rounded-xl border p-3"
              placeholder="CVC"
              inputMode="numeric"
              name="cvc"
            />
          </div>
        </div>
      </div>

      {/* Resume-kort */}
      <div className="rounded-2xl border p-3">
        <div className="text-sm font-semibold">
          {trip?.cityDeparture} til {trip?.cityDestination}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">{dayLabel(trip?.departureDate)}</span>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          {seats} sæde{seats > 1 ? "r" : ""}
        </div>
        <div className="mt-2 flex justify-between text-sm font-medium">
          <span>Samlet pris</span>
          <span>DKK {totalPrice ?? 0}</span>
        </div>
      </div>

      {/* Actions */}
      <Button type="submit" className="w-full rounded-2xl bg-sky-500 text-white py-3" disabled={maxSeats === 0}>
        Book
      </Button>
      <Button type="button" onClick={onBack} className="w-full rounded-2xl bg-sky-100 text-sky-800 py-3">
        Tilbage
      </Button>

    </form>
  );
};
