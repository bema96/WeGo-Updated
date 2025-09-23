# WeGo Projekt Præsentation - 7 minutter

## Introduktion til Next.js Framework (2 minutter)

Til mit WeGo samkørselsprojekt valgte jeg Next.js som frontend framework, og det var et meget bevidst valg. Next.js er bygget oven på React, men tilbyder nogle kraftfulde funktioner, der gør udviklingen både hurtigere og mere effektiv.

Den første store fordel er Next.js' filbaserede routing system. I stedet for at skulle konfigurere routes manuelt, bliver hver fil i app-mappen automatisk til en side. 
Som I kan se i mit projekt, har jeg en struktur hvor `app/(public)/page.js` bliver til forsiden, og `app/(public)/list/page.js` bliver til `/list` ruten.

Next.js giver mig også mulighed for at blande server-side og client-side rendering. Som standard kører alle komponenter på serveren, hvilket giver bedre performance og SEO. Men når jeg har brug for browser-funktionalitet som state management eller event handlers, kan jeg tilføje `"use client"` direktivet øverst i filen. Dette ser I i mange af mine komponenter, hvor jeg bruger hooks som useState eller useRouter.

En anden fed feature jeg har udnyttet er Next.js' metadata API. I hver page-fil kan jeg eksportere et metadata objekt, der automatisk genererer SEO-venlige meta tags. For eksempel i min ListPage har jeg defineret title, description og keywords, som Next.js automatisk indsætter i HTML head-sektionen i devmode.

Endelig har jeg prøvet at lave genanvendelig komponenter, adskille logik ved at ligge det i utils og køre API kald kun i page komponent. Alt for at holde koden clean, letlæsligt og komponenterne så vidt muligt 'dumme' og genbrugelig. 

## Fil 1: ListPage.js - Page Component (2 minutter)

Nu går vi i dybden med min ListPage, som er hjertet i søgefunktionaliteten. Denne fil starter med `"use client"` direktivet, fordi den bruger browser-specifikke hooks og state management.

Øverst importerer jeg alle nødvendige hooks og komponenter. Særligt interessant er `useSearchParams` og `useRouter` fra Next.js navigation. useSearchParams er en hook, der giver mig adgang til URL-parametrene - altså det der kommer efter spørgsmålstegnet i URL'en. Dette bruges til at læse søgeparametrene fra forsiden, når brugeren søger efter "fra" og "til" destinationer.

Jeg har to sæt state-variabler til søgning: `fromInput` og `toInput` styrer hvad brugeren ser i input-felterne, mens `queryFrom` og `queryTo` styrer den faktiske filtrering af data. 

Filtreringssystemet er bygget op omkring et `filters` state-objekt, der indeholder alle brugerens valg - antal sæder, bagagestørrelse og præferencer. Dette objekt sendes til min `applyFilters` utility-funktion, som returnerer de filtrerede resultater.

Dataflow'et fungerer sådan: Først henter jeg data med mine custom hooks - `useTrips`, `useReview` og `useBagsize`. Derefter kører jeg dataene gennem `SearchTrips` funktionen baseret på tekst-søgning, og til sidst gennem `applyFilters` baseret på brugerens filter-valg. Dette giver mig et endeligt `results` array, som sendes til List-komponenten.

`handleSubmit` funktionen opdaterer query state og filtrerer baseret på brugerens indtastede søgning, hvorefter listen re-renderes med de nye resultater. Funktionen tager også brugerens input og pusher det til URL'en via router.push, så søgningen bliver synlig i browserens adresselinje.

I return er det værd at ligge mærke til hvordan vi kommuniker med child komponenterne, ved at bruge props og states. 
SortTrips er specielt ved at vi laver en arrow i en arrow function. Bruger patch til at hente værdier fra child komponenterne  og setFilter statement til at hente de gamle værdier og opdater med de nye. 

## Fil 2: Navigation.js - Component (1,5 minutter)

Navigation-komponenten demonstrerer responsive design og conditional rendering. Den bruger `useAuth` hook til at få adgang til brugerens login-status og viser forskellige elementer baseret på om brugeren er logget ind.

Min useAuth er en contextProvider der pakker appen ind i en provider i min layout, som gør jeg kan bruge authentication der hvor jeg har brug for det. F.eks her i navigation hvor jeg vil tjekke om bruger er logget ind for at kunne vise username. 
useContext er en måde at dele data flere steder uden at skal gentage api kald i hver fil.

Komponenten har to forskellige layouts: `MobileNavigation` og `DesktopNavigation`, som vises baseret på Tailwind CSS breakpoints. Dette er et godt eksempel på mobile-first design, hvor jeg starter med mobil-layoutet og tilføjer desktop-funktionalitet med `lg:` prefixes.

State management her er simpelt men effektivt. `menuOpen` state styrer om burger-menuen er åben på mobil, mens `open` state styrer modal-vinduet for "Sådan virker det". Begge bruger standard React useState hook.

Den interessante del er integration med react-burger-menu biblioteket. Jeg har customized burger-menuen med CSS i `hamburgerMenu.css`, hvor jeg definerer animationer og styling. Menuen bruger et render prop pattern, hvor jeg sender en custom close-knap som `customCrossIcon`.

Conditional rendering bruges flere steder - for eksempel vises brugerens navn kun hvis `loginData` eksisterer, og desktop/mobil layouts vises baseret på CSS classes. Dette pattern med `&&` operatoren er meget almindeligt i React for at vise elementer betinget.

## Fil 3: useFetch.js - Custom Hook (1,5 minutter)

useFetch er et perfekt eksempel på en custom hook, som er en af React's mest kraftfulde patterns. Custom hooks lader mig genbruge stateful logik på tværs af komponenter uden at gentage kode.

Hooken returnerer tre værdier: `data`, `loading` og `error`, som følger et standard pattern for asynkron data-hentning. Dette kaldes ofte "loading states pattern" og giver komponenter mulighed for at vise forskellige UI-tilstande.

useEffect hook'en er hjertet i denne funktion. Den kører når komponenten mounter og hver gang `endpoint` eller `options` ændrer sig. Dependency array'et `[endpoint, JSON.stringify(options)]` sikrer, at fetch'en kun kører når det er nødvendigt. JSON.stringify bruges fordi objects ikke kan sammenlignes direkte i JavaScript.

Error handling er implementeret med try-catch blokke. Hvis response ikke er ok, parser jeg error-beskeden fra serveren, eller falder tilbage til en generisk besked. Dette giver brugeren meningsfulde fejlmeddelelser.

Cleanup i finally-blokken sikrer, at loading-state altid bliver sat til false, uanset om request'en lykkes eller fejler. Dette forhindrer, at UI bliver hængende i loading-tilstand.

Hooken bruges i hele applikationen - for eksempel `useTrips`, `useReview` og `useBagsize` er alle bygget oven på denne base-hook, hvilket viser kraften i genbrugelig kode.

## Konklusion (30 sekunder)

Mit WeGo-projekt demonstrerer moderne React-udvikling med Next.js. Jeg har brugt file-based routing, server/client rendering, custom hooks og responsive design til at skabe en brugervenlig samkørselstjeneste. Arkitekturen er skalerbar og maintainable, med klar separation mellem data-hentning, state management og UI-komponenter.

---

**Total tid: Cirka 7 minutter**