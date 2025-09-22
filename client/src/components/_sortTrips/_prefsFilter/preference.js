// components/preference.js
"use client";

const OPTIONS = [
  { id: "comfort",  label: "Komfort" },
  { id: "children", label: "Børn"    },
  { id: "smoking",  label: "Rygning" },
  { id: "music",    label: "Musik"   },
  { id: "pets",     label: "Dyr"     },
];

export const PrefsFilter = ({ value, onChange, className }) => {

  return (

    <div className={`${className} border-b border-gray-300 pb-5`}>
      <div className="font-semibold">Præferencer</div>

      {OPTIONS.map(selected => (
        <label key={selected.id} className="flex gap-3 py-2 items-center">

          <input
            type="checkbox"
            className="h-5 w-5"
            checked={value.includes(selected.id)}


            onChange={() => onChange?.(
                value.includes(selected.id)
                  ? value.filter(id => id !== selected.id)
                  : [...value, selected.id]
              )
            }
          />
          <span>{selected.label}</span>
        </label>
      ))}
    </div>
  );
};
