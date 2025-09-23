//components/rating.js
"use client";
// Imports
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export const StarRating = ({ value }) => (
  
  <Box>
    <Rating
      name="rating-read"
      value={value}
      readOnly
    />
  </Box>
);
