// utils/searchTrips.js
import { Normalize } from "./danishCapitals";

export const SearchTrips = (trips, from, to) => {
      
  const valueDeparture   = Normalize(from || "");              
  const valueDestination = Normalize(to   || "");              

  return trips.filter(trip =>
    Normalize(trip?.cityDeparture   || "").includes(valueDeparture  ) &&
    Normalize(trip?.cityDestination || "").includes(valueDestination)
  );
};


// Vi kører from/to igennem Nomalize funktionen, og filterer ture hvor afgang/ankomst indeholder de normaliserede værdier.
// Hver sider er valgfri - tomt felt ignoreres. Hvis begge er tomme, returneres alle ture. Hvis kun den ene er udfyldt, søges kun på denne.


/*
Tekniske begreber:

||            - logical OR operator. Tjekker om mindst en betingelse er sand.

.filter()     - array method (immutable) react hook. Returnerer et nyt array med elementer der passer til en given betingelse.

.includes()   - string method (immutable) react hook. Tjekker om en given værdi findes i strengen.

?.            - optional chaining operator. Tjekker om objektet eksisterer før der tilgås en property

&&            - logical AND operator. Tjekker om begge betingelser er sande

*/
