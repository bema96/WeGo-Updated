// utils/dayLabel.js
export function dayLabel(dateInput) {
    
  const date = new Date(dateInput);
  if (isNaN(date)) return "";

  // Hele dage, UTC-midtpunkt (UTC står for Universal Time Coordinated)
  // En global standard for tid, der ikke påvirkes af tidszoner eller sommertid.
  const MS_PER_DAY = 86400000;
  const dayNum = (x) => Math.floor(Date.UTC(x.getFullYear(), x.getMonth(), x.getDate()) / MS_PER_DAY);

  const diff = dayNum(date) - dayNum(new Date()); 

  const time = date.toLocaleTimeString("da-DK", { hour: "2-digit", minute: "2-digit" });
  const dateNumber = date.toLocaleDateString("da-DK", { day: "2-digit", month: "2-digit", year: "numeric" });
  const weekdays = ["søndag","mandag","tirsdag","onsdag","torsdag","fredag","lørdag"];

  if (diff <=  -2) return `${dateNumber} kl. ${time}`;   // >-1 dage = dato
  if (diff === -1) return `i går kl. ${time}`;           //  -1 dage = Igår
  if (diff ===  0) return `i dag kl. ${time}`;           //   0 dage = Idag
  if (diff ===  1) return `i morgen kl. ${time}`;        //   1 dage = Imorgen
  if (diff >=   7) return `${dateNumber} kl. ${time}`;   //  7+ dage = dato
  return `${weekdays[date.getDay()]} kl. ${time}`;       // 2–6 dage = ugedag
}


// Her er logik for at generere en læsbar label baseret på en dato.
// Dato (idag), bliver til "i dag" - "i morgen" osv.
// Klokkeslæt er normaliseret til at vises med kun timer og minutter af 2 digits.


/*
Teknisk kort:

new Date                  - constructor for dato

Math.floor                - method for at runde ned

Date.UTC                  - constructor for UTC dato

toLocaleTimeString        - lokal formatering

if-chain                  - betingelser for labels

/                         - division (gennemsnit)

const dayNum = (x) => Math.floor(Date.UTC(x.getFullYear(), x.getMonth(), x.getDate()) / MS_PER_DAY);    - funktion for at konvertere dato til antal dage siden 1. januar 1970 (UTC)

*/