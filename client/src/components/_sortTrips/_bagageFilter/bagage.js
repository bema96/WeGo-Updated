// components/bagage.js
"use client";

export function BaggageFilter({ options, value, onChange, className}) {
  
  return (

    <div className={`${className} border-b border-gray-300 pb-5`}>
      <div className="font-semibold">Bagage</div>
      <div className="flex gap-3 justify-center pt-3">

        {/* loop gennem options */}
        {options.map((option, index) => (
          <label key={option.id} className="cursor-pointer select-none">
            
            {/* knapper med image */}
            <input
              type="radio"
              name="bagSize"
              value={option.id}
              checked={value === option.id}
              onChange={() => onChange?.(value === option.id ? null : option.id)} 
              className="sr-only"
            />
            <img
              src={option.iconUrl}
              alt={option.name}
              width={40}
              height={35}
              className={`block rounded p-1 transition ${
                value != null && index <= options.findIndex(opt => opt.id === value)
                  ? "ring-2 ring-blue-300 bg-emerald-50 opacity-100"
                  : "opacity-70 hover:opacity-100"
              }`}
            />
          </label>
        ))}
      </div>
    </div>
  );
};
