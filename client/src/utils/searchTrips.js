// utils/searchTrips.js
import { Normalize } from "./danishCapitals";

export const SearchTrips = (trips, from, to) => {
      
  const valueDeparture   = Normalize(from || "");              
  const valueDestination = Normalize(to   || "");              

  return trips.filter(trip =>
    Normalize(trip?.cityDeparture || "").includes(valueDeparture) &&
    Normalize(trip?.cityDestination || "").includes(valueDestination)
  );
};


// Vi kører from/to igennem Nomalize funktionen, og filterer ture hvor afgang/ankomst indeholder de normaliserede værdier.
// Hver sider er valgfri - tomt felt ignoreres. Hvis begge er tomme, returneres alle ture. Hvis kun den ene er udfyldt, søges kun på denne.

// Hvad teknisk består koden af?

// => - arrow-function med prop-destructuring objekt.

// || - logical OR operator

// .filter() - array method (immutable, returns new array)

// .includes() - string method

// ?. - optional chaining operator

// && - logical AND operator