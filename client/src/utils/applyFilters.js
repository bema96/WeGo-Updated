// utils/applyFilters.js
export const applyFilters = (trips, filters) => {

  const { selectedFilter, seats, bagSizeId, pref } = filters;


  if (selectedFilter === "seats") {                                                               
    const min = seats || 1;                                                                      
    return trips.filter(trip => ((trip.seatsTotal ?? trip.seats) || 0) >= min);
  }; 


  if (selectedFilter === "bagage") {
    const limit = bagSizeId || 1;
    return limit === 1
      ? trips
      : trips.filter(trip => ((trip.bagSizeId || 1) >= limit));
  };


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
