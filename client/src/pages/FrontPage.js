// pages/FrontPage.js
"use client";
// Imports
import { useState        } from "react";
import { useRouter       } from "next/navigation";
import { Button          } from "@/components/UI/UniversalButton/button";
import { useSlides       } from "@/hooks/useSlides";
import { Slideshow       } from "@/components/_slides/slides";
import { SearchLift      } from "@/components/_search/searchLift";
import { ErrorMessage    } from "@/components/UI/Error.../ErrorMessage";
import { LoadingWavyDots } from "@/components/UI/Loading.../LoadingWavyDots";



export default function FrontPage() {
  // States
  const [from, setFrom] = useState("");
  const [to,   setTo  ] = useState("");
  const [infoOpen, setInfoOpen] = useState(false);

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
  if (loading) return <LoadingWavyDots text="Indlæser..." />;
  if (error  ) return <ErrorMessage message="Der opstod en fejl under hentning af data." />;


  return (

      <section className="relative z-0 overflow-visible">

        <Slideshow 
        slides={slides} 
        />

        {/* Søgefelt */}
        <div className="absolute left-1/2 -translate-x-1/2 top-20 w-[90%] max-w-[800px] z-0 lg:top-1/2 lg:-translate-y-1/2">
          <SearchLift
            text="Find et lift"
            from={from}
            to={to}
            onFrom={setFrom}
            onTo={setTo}
            onSubmit={handleSubmit}
            className=""
          />
        </div>

        {/* 'Sådan virker det */}



        {/* Højde */}
        <div
          className="absolute inset-x-0 bottom-0 z-10 lg:hidden overflow-hidden"
          style={{ "--reveal": "70vh" }} 
        >     

          <Button
            variant={"primary"}
            onClick={() => setInfoOpen(o => !o)}
            className={`absolute -right-3 z-[10000] rounded-xl text-left bg-[var(--sky)] text-white border-2 
                        h-[50px] w-[92px] pl-3 shadow lg:hidden hover:scale-110 transition
                        ${infoOpen ? "top-0" : "top-95 bottom-[calc(var(--reveal)+1rem)]"}`}

          >
            {infoOpen ? "Luk" : "info"}
          </Button>    

          <article
            className={`h-[var(--reveal)] max-h-[var(--reveal)] overflow-auto bg-gray-100 rounded-t-2xl shadow px-5 py-5 transform-gpu transition-transform duration-300 ease-out 
              ${infoOpen ? "translate-y-0" : "translate-y-[calc(var(--reveal))]"}`}
          >
            <h1 className="font-semibold text-2xl">Sådan virker det</h1>
            <p>
              Søg hvor du skal fra og til, vælg dato, find en tur der matcher pris og tidspunkt, og book. 
              Hop i chatten med chaufføren, få mødested og tid på plads, og sig hvis du har præferencer (musik/stille, pause, bagage). 
              Mød op fem minutter før og vær nem at finde. Prisen dækker benzin (+ evt. bro/færge) og deles fair mellem jer – ingen skjulte ting. 
              Tjek regler: hvor meget bagage, kæledyr ok eller ej, rygepolitik. Bliver planen ændret, så meld afbud i god tid. 
              Efter turen: giv en kort, ærlig anmeldelse, så andre ved, hvad de går ind til. 
              Det handler bare om klar besked, respekt i bilen og en billigere, grønnere tur.
            </p>
          </article>
        </div>

      </section>
  );
}
