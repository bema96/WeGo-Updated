// utils/ratings.js
export function calcAverage(reviews, userId) {
  // Akkumulator: starter på 0 for at ungå Nan eller undefined. 
  let totalStars = 0;
  let reviewCount = 0;

  reviews.forEach((review) => {
    if (review.reviewedUserId === userId) {
      totalStars += review.numStars || 0;
      reviewCount += 1;
    }
  });

  return reviewCount ? totalStars / reviewCount : 0;
}


// Beregner gennemsnit af stjerner for en bruger baseret på anmeldelser

/*
Tekniske begreber:

.forEach()      - iteration (immutabel) react hook

===             - strict equality operator. Tjekker om to værdier er identiske i både værdi og type.

||              - logical OR operator. Tjekker om mindst en betingelse er sand.

?               - ternary guard operator. Tjekker en betingelse og returnerer en værdi hvis sand, ellers en anden værdi.

+=              - akkumulering (sammenlægning af værdier).

/               - division (gennemsnit).

*/