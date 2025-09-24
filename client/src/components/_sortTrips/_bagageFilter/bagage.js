// components/bagage.js
"use client";

export function BaggageFilter({ options, value, onChange, className}) {
  
  return (

    <div className={`${className} border-b border-gray-300 pb-5`}>
      <h2 className="font-semibold">Bagage</h2>
      <div className="flex gap-5 justify-center pt-3">

        {options.map((option) => (
          <label key={option.id} className="cursor-pointer select-none">
            
            {/* knapper med image */}
            <input
              type="radio"
              name="bagSize"
              value={option.id}
              checked={value === option.id}
              onChange={() => onChange?.(option.id)}
              className="sr-only"
            />
            <img
              src={option.iconUrl}
              alt={option.name}
              width={48}
              className={`block rounded-lg p-2 transition ${
                value === option.id 
                ? "border-2 border-blue-300 bg-blue-100"
                : "border border-gray-300 hover:border-gray-500"
              }`}
            />
          </label>
        ))}
      </div>
    </div>
  );
};
