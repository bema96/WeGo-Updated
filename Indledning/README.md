# WeGo Projekt Præsentation - 7 minutter

## Introduktion til Next.js Framework

Til mit WeGo samkørselsprojekt valgte jeg Next.js som frontend framework med Tailwind CSS. Next.js er bygget oven på React, men tilbyder nogle kraftfulde funktioner, der gør udviklingen både hurtigere og mere effektiv og Tailwind CSS er valgt, fordi jeg kan style direkte i JSX hvilket er hurtigere end at oprette ekstern CSS filer.

Den første store fordel er Next.js' filbaserede routing system. I stedet for at skulle konfigurere routes manuelt, bliver hver fil i app-mappen automatisk til en side.
Som I kan se i mit projekt, har jeg en struktur hvor `app/(public)/page.js` bliver til forsiden, og `app/(public)/list/page.js` bliver til `/list` ruten.

Next.js giver mig også mulighed for at blande server-side og client-side rendering. Som standard kører alle komponenter på serveren, hvilket giver bedre performance og SEO. Men når jeg har brug for browser-funktionalitet som state management eller event handlers, kan jeg tilføje `"use client"` direktivet øverst i filen. Dette ser I i mange af mine komponenter, hvor jeg bruger hooks som useState eller useRouter.

En anden fed feature jeg har udnyttet er Next.js' metadata API. I hver page-fil kan jeg eksportere et metadata objekt, der automatisk genererer SEO-venlige meta tags. For eksempel i min ListPage har jeg defineret title, description og keywords, som Next.js automatisk indsætter i HTML head-sektionen i devmode.

Endelig har jeg prøvet at lave genanvendelig komponenter, adskille logik ved at ligge det i utils og køre API kald kun i page komponent. Alt for at holde koden clean, letlæseligt og komponenterne så vidt muligt 'dumme' og genanvendelig.

Jeg har udvalgt 3 filer jeg vil forkalre lidt mere om. Filer der har hver deres formål.
En page, en komponent og en hook.

## Fil 1: ListPage.js - Page Component

ListPage, som er hjertet i søgefunktionaliteten. Denne fil starter med `"use client"` direktivet, fordi den bruger browser-specifikke hooks og state management.

Øverst importerer jeg alle nødvendige hooks og komponenter. Særligt interessant er `useSearchParams` og `useRouter` fra Next.js navigation. useSearchParams er en hook, der giver mig adgang til URL-parametrene - altså det der kommer efter spørgsmålstegnet i URL'en. Dette bruges til at læse søgeparametrene fra forsiden, når brugeren søger efter "fra" og "til" destinationer.

Jeg har to sæt state-variabler til søgning: `fromInput` og `toInput` styrer hvad brugeren ser i input-felterne, mens `queryFrom` og `queryTo` styrer den faktiske filtrering af data.

Sorteringssystemet er bygget op omkring et `filters` state-objekt, der indeholder alle brugerens valg - antal sæder, bagagestørrelse og præferencer. Dette objekt sendes til min `applyFilters` utility-funktion, som returnerer de filtrerede resultater.

Dataflow'et fungerer sådan: Først henter jeg data med mine custom hooks - `useTrips`, `useReview` og `useBagsize`.
Derefter kører jeg dataene gennem `SearchTrips` funktionen baseret på tekst-søgning, og til sidst gennem `applyFilters` baseret på brugerens filter-valg.
Dette giver mig et endeligt `results` array, som sendes til List-komponenten.

`handleSubmit` funktionen opdaterer query state og filtrerer baseret på brugerens indtastede søgning, hvorefter listen re-renderes med de nye resultater.
Funktionen tager også brugerens input og pusher det til URL'en via router.push, så søgningen bliver synlig i browserens adresselinje.

I return er det værd at ligge mærke til hvordan vi kommuniker med child komponenterne, ved at bruge props.
SortTrips er et godt eksempel:
child kalder onChange(patch), og parent merger patch ind i prev.
...patch er alle nye ændringer/værdier i childrens.
...prev er nuværende data/værdier.
patch overskriver prev, ved hver change.

## Fil 2: Navigation.js - Component

Navigation-komponenten demonstrerer responsive design og conditional rendering. Den bruger `useAuth` hook til at få adgang til brugerens login-status og viser forskellige elementer baseret på om brugeren er logget ind.

Min useAuth er en contextProvider der pakker appen ind i en provider i min layout, som gør jeg kan bruge authentication der hvor jeg har brug for det. F.eks her i navigation hvor jeg vil tjekke om bruger er logget ind for at kunne vise username.
useContext er en måde at dele data flere steder uden at skal gentage api kald i hver fil.

Komponenten har to forskellige layouts: `MobileNavigation` og `DesktopNavigation`, som vises baseret på Tailwind CSS breakpoints. Dette er et godt eksempel på mobile-first design, hvor jeg starter med mobil-layoutet og tilføjer desktop-funktionalitet med `lg:` prefixes.

State management her er simpelt men effektivt. `menuOpen` state styrer om burger-menuen er åben på mobil, mens `open` state styrer modal-vinduet for "Sådan virker det". Begge bruger standard React useState hook.

Den interessante del er integration med react-burger-menu biblioteket. Jeg har customized burger-menuen med CSS i `hamburgerMenu.css`, hvor jeg definerer animationer og styling. Menuen bruger et render prop pattern, hvor jeg sender en custom close-knap som `customCrossIcon`.

Conditional rendering bruges flere steder - for eksempel vises brugerens navn kun hvis `loginData` eksisterer, og desktop/mobil layouts vises baseret på CSS classes. Dette pattern med `&&` operatoren er meget almindeligt i React for at vise elementer betinget.

## Fil 3: useFetch.js - Custom Hook

`useFetch` er en lille helper til at hente data. Custom hooks lader mig genbruge staten uden jeg skal skrive hele koden igen

Hooken returnerer tre værdier: `data`, `loading` og `error` — og kører asynkron datahentning da hentning fra API ikke nødvendigvis kommer med det samme, men kan have en transporttid.

Den kører automatisk med `useEffect` ved hver mount. Altså hver gang jeg ender på en page med custom hook, kører den mount igen ved hjælp ar conditional rendering.

Fejlhåndtering sker med try/catch. Hvis response.ok ikke er sand, parser jeg en fejlbesked eller falder tilbage til en generisk besked, så brugeren får meningsfuld feedback. I finally slår jeg altid loading fra, uanset udfald, så UI ikke hænger i “loading”.

## Konklusion

---
