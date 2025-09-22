// pages/FrontPage.js
"use client";
// Imports
import { useState        } from "react";
import { useRouter       } from "next/navigation";
import { useSlides       } from "@/hooks/useSlides";
import { Slideshow       } from "@/components/_slides/slides";
import { SearchLift      } from "@/components/_search/searchLift";
import { ErrorMessage    } from "@/components/UI/Error.../ErrorMessage";
import { LoadingWavyDots } from "@/components/UI/Loading.../LoadingWavyDots";



export default function FrontPage() {
  // States
  const [from, setFrom] = useState("");
  const [to,   setTo  ] = useState("");
  // Next router
  const router = useRouter();
  // Hooks
  const { data, loading, error } = useSlides();
  // Data sikring
  const slides = Array.isArray(data) ? data : [];


  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams({ from, to });
    router.push(`/list?${params}`);
  };

  // Loading & Error
  if (loading) return <LoadingWavyDots text="" />;
  if (error) return <ErrorMessage message="" />;


  return (

    <div>

      {/* HERO / SLIDER */}
      <section className="relative z-0 overflow-visible">
        <Slideshow slides={slides} />

        {/* Søgefelt */}
        <div className="absolute left-1/2 -translate-x-1/2 top-40 w-[90%] max-w-[800px] z-20">
          <SearchLift
            text="Find et lift"
            from={from}
            to={to}
            onFrom={setFrom}
            onTo={setTo}
            onSubmit={handleSubmit}
            className="w-full"
            submitClassName="py-4"
          />
        </div>

        {/* 'Sådan virker det */}
        <div className="absolute inset-x-0 bottom-0 z-20 lg:hidden">
          <section className="px-5 py-5 bg-gray-100">
            <h1 className="font-semibold text-2xl">Sådan virker det</h1>
            <p>Samkørsel: én kører, andre hopper med, og alle sparer tid og penge. Søg på fra/til og dato, vælg en tur, book et sæde, og bekræft mødested og tidspunkt i chatten (kom fem minutter før). </p>
            <br/>
            <p>Betalingen dækker brændstof og eventuelle bro- eller færgeomkostninger og fordeles fair mellem passagererne. Tjek detaljer som bagagestørrelse, kæledyr, rygepolitik, musik eller stillekørsel samt chaufførens rating. Aflys i god tid og giv en kort, ærlig anmeldelse efter turen. </p>
            <br/>
            <p>Vis almindelig pli: hold bilen pæn, spørg før mad, brug sele og respekter tempoet. Chaufføren har ansvar for bil og kørsel, platformen forbinder jer, og du kan forvente, at bilen er lovlig og forsikret. Klar kommunikation gør turen grønnere, billigere og mere chill fra A til B.</p>
          </section>
        </div>
        
      </section>
    </div>
  );
}
