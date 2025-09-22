// utils/danishCapitals.js
export function Normalize(input) {
    return (input)

    .trim()
    .toLowerCase()

    .replaceAll("å", "aa")
    .replaceAll("æ", "ae")
    .replaceAll("ø", "oe")
}