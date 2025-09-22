// components/seats.js
"use client";

export function SeatsFilter({ value = 1, min = 1, max = 6, onChange, className = "" }) {

  return (
    
    <div className={`${className} border-b border-gray-300 py-5`}>
      <div className="flex justify-between pb-3">
        <h2 className="font-semibold">Antal pladser:</h2>
        <span className="font-semibold">{value}</span>
      </div>

      <input
        className="w-full"
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(seat) => onChange?.(seat.target.value)}
      />
    </div>
  );
};
