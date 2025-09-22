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
