# Forside

#### Opgavens navn: WeGo

#### Navn: Benjamin Magno

#### Hold: H1WE080124

#### Dato: fre. 19. sep. 2025

#### GitHub repository:

#### Login-oplysninger (til demo/test)

#### email: info@webudvikler.dk

#### password: password

# Vurdering af egen indsats

## Overblik

Jeg startede med at læse opgaven igennem og satte et simpelt repo op i GitHub. Jeg bootstrappede Next.js + Tailwind til frontend og hooks til API’et, lagde Prisma på MySQL og fik de første migreringer kørt. Det kørte rigtig smurt i starten, men det blev hurtig udfordrende allerede på dag 2 da jeg skulle igang med liste og detalje. Ikke at hente data, men min ønskede funktionalitet på tværs af filerne. Jeg ville gerne have den mest praktiske løsning for ikke at klumpe for meget kode sammen, men det krævede at jeg kunne håndtere metoder jeg ikke har brugt ofte. Jeg finder længere i forløbet ud af at designet er for krævende at kunne nås inden for perioden, for mit vedkommende. Det gør jeg blev nødt til at priotere hvilke sider jeg ville have færdig. Meget af de udfordringer jeg havde tog fokus og gjorde jeg glemte at køre en clean commits af issue hen af vejen. Det blev i sidste ende til store commits af en masse filer.

#### UPDATE:

Efter endt aflevering har jeg gennemgået koden en gang til og fundet mange fejl og kodeopbygning jeg ikke stolt kan acceptere. Det sker når man skynder sig på et projekt hvor tidsforhold ikke er sat efter projektets størrelse og funktioner.
Jeg valgte at ryde op i filerne, forbedre koden og færdigøre enkelte funktioner og styling, som jeg bøvlede med. Jeg fik samtidig også deployet hjemmeside til netlifty(frontend) - railway(backend) - storage(cloudinary).
Det er stadig mange ting at færdiggøre hvis det skal leve op til designet. Men måske til en anden god gang,

## Anvendte teknologier

- Frontend: Next.js, Tailwind CSS
- Backend: Node.js (Express)
- Database: MySQL (Prisma)
- Auth: JSON Web Tokens (JWT) i JavaScript
- Deploy: Backend på Railway, frontend på Netlify (ønske)

#### UPDATE:

- Deploy: Backend på railway, frontend på netlify, storage på cloudinary (succes)

## Uge-oversigt

#### Mandag

_Startede med at oprette en Github repo og projekt i VSCode. Inførte de første issue og startede med at bygge min struktur._

#####

#### Tirsdag

_Hooks, login, samt frontpage og search komponent blev lavet og eller startet på_

#### Onsdag

_jeg forsatte med search komponenten og fandt den udfordrende. Var nødt til at lave lidt flere reasearch og fandt hjælp hos next.js guide til problemet_

#### Torsdag

_Listen af trips samt detalje blev der lavet funktioner til, utils og andet. Fandt det meget udfordrende, både stylingen men også funktionaliteten der skulle finde sted. Brugte en masse tid på at finde relevant viden jeg kunne bruge for at få en tingene til at fungere_

#### Fredag

_Bookingen samt småmangler blev lavet. Også en udfordring at få den til at hænge sammen med alt andet data og "godkendes" af min API_

#### UPDATE:

#### Lørdag

_Forsatte med at ryde op i kode og forbedre den..._

#### Søndag

_Forsatte med at ryde op i koden og forbedre den..._

#### Mandag

_Forsatte med at ryde op i koden og forbedre den..._

#### Tirsdag

_Fik deploy igang og justeret..._

# Redegørelse for kodeelementer

Jeg bruger Next, fordi filstrukturen automatisk bliver til sider. Det føles smart og kommer med andre fordele.

Tailwind tager jeg, fordi jeg kan bygge layout direkte i komponenterne. Hurtigt, konsekvent, og jeg slipper for at rode i kæmpe CSS-filer.

Formularer kører jeg med react-hook-form. Det er lettere at implementere.

Mobilmenuen er react-burger-menu. Det er en færdig løsning menu klar til brug.

AuthProvider (fra min lærer) bruger jeg til at holde styr på login-state i frontenden og låse sider af, når det giver mening.

Login ligger på sin egen side – ikke i mobilnav. Det er bare mere praktisk: bedre fokus, renere flow.

Bagage har jeg lavet med et hierarki, fordi det er mest oplagt for brugeren.

# Kilder

Jeg får kilder flere steder fra. Hovedsageligt fra tidligere projekter. Det har ikke været nemt at tilpasse til dette da de har fungeret til et andet formål der ikke var tro kopi til dette.
Derfor har jeg søgt på nettet såsom stackoverflow, nextjs.org, mui.com, mdn, w3school og youtube samt forum fra andre udvikler.

#### useSearchParams/pathname:

https://nextjs.org/docs/app/api-reference/functions/use-router

#### suspense:

https://nextjs.org/docs/app/api-reference/functions/use-search-params

#### Checkbox utils

https://stackoverflow.com/questions/61129996/react-add-remove-item-to-array-if-checkbox-is-selected-not-selected-hooks-not

#### select seats dropdown:

https://stackoverflow.com/questions/74367838/react-select-dropdown-from-1-to-n

#### Mui UI:

https://mui.com/material-ui/getting-started/

#### booking seats calc

https://www.youtube.com/watch?v=1Guddi2MbOM
