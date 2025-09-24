// utils/danishCapitals.js
export function Normalize(input) {
    return (input)

    .trim()           // fjernr whitespace
    .toLowerCase()    // konverterer til små bogstaver

    .replaceAll("å", "aa")  // erstat å med aa
    .replaceAll("æ", "ae")  // erstat æ med ae
    .replaceAll("ø", "oe")  // erstat ø med oe
}



/*
Tekniske begreber:

trim()             -  method der fjerne whitespace på begge sider af en streng.

toLowerCase()      - method der konverterer en streng til små bogstaver.

replaceAll()       - method der erstatter ny streng med en, nogle eller alle forekomster af en given streng.

*/