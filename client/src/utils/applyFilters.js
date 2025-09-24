// utils/applyFilters.js
export const applyFilters = (trips, filters) => {

  // Her trækker jeg properties ud af hver objekt som kommer fra filters (object/property destructuring) 
  const { selectedFilter, seats, bagSizeId, pref } = filters;


  // Hvis valgt - filtrer trip på antal sæder (minimum 1 sæde)
  if (selectedFilter === "seats") {                                                               
    const min = seats || 1;                                                                      
    return trips.filter(trip => ((trip.seatsTotal ?? trip.seats) || 0) >= min);
  }; 


  // Hvis valgt - filtrer trip på bagagestørrelse
  if (selectedFilter === "bagage") {
    const limit = bagSizeId || 1;
    return limit === 1
      ? trips
      : trips.filter(trip => ((trip.bagSizeId || 1) >= limit));
  };


  // Hvis valgt - filtrer trip på præferencer
  if (selectedFilter === "preference") {
    const selected = pref;

    return trips.filter(trip =>
      (selected.includes("children") ? trip.allowChildren === true : true) &&
      (selected.includes("smoking")  ? trip.allowSmoking  === true : true) &&
      (selected.includes("music")    ? trip.allowMusic    === true : true) &&
      (selected.includes("pets")     ? trip.allowPets     === true : true) &&
      (selected.includes("comfort")  ? trip.hasComfort    === true : true)
    );
  };

  
  return trips;
};


/*
Tekniske begreber:

??                - nullish coalescing operator. Tjekker om venstre værdi er null eller undefined, hvis ja, returneres højre værdi.

? :               - ternary/if-else operator. Tjekker en betingelse og returnerer en værdi hvis sand, ellers en anden værdi.

||                - logical OR operator. Tjekker om mindst en betingelse er sand.

.filter(...)      - method der returnerer et nyt array med elementer der passer til en given betingelse.

.includes(...)    - method der tjekker om en værdi findes i en array, returner true/false.

&&                - logical AND operator. Tjekker om begge betingelser er sande.

===              - strict equality operator. Tjekker om to værdier er identiske i både værdi og type.

*/