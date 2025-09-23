//components/_tripDetail/information.js
"use client"
// Imports
import { FerryIcon    } from "@/assets/icons/ferry";
import { CrossIcon    } from "@/assets/icons/cross";
import { CheckIcon    } from "@/assets/icons/check";
import { BagageIcon   } from "@/assets/icons/bagage";
import { ComfortIcon  } from "@/assets/icons/comfort";
import { ElectricIcon } from "@/assets/icons/electric";



export const Information = ({ trip }) => {
    const BagageText = {
        1: "Lille håndtaske",
        2: "Lille kuffert & en håndtaske",
        3: "Stor kuffert & en håndtaske"
    };


    return(

        <div className="flex flex-col">
            <h1 className="font-semibold text-2xl py-5">Information</h1>
            <div className="bg-white p-5 rounded-2xl">
                <div>
                    {(trip.useFerry) === true && (
                    <ul className="flex gap-2 items-center text-xl font-medium">
                     <FerryIcon className="w-8 h-auto" />
                     <h2>Ruten inkluderer en</h2>
                    </ul>
                    )}
                </div>

                <div className="flex flex-col gap-4">
                    <h1 className="font-medium text-2xl">Detaljer</h1>
                    {(trip.hasComfort) === true && (
                    <ul className="flex gap-3 items-center text-lg text-[var(--gral)]">
                        <ComfortIcon className="w-5 h-auto" />
                        <p>Maks. 2 personer på bagsædet</p> 
                    </ul>
                    )}
                    {trip.bagSizeId && (
                    <ul className="flex gap-3 items-center text-lg text-[var(--gral)]">
                        <BagageIcon className="w-5 h-auto" />
                        <p>{BagageText[trip.bagSizeId]}</p> 
                    </ul>
                    )}
                    {(trip.isElectric) === true && (
                    <ul className="flex gap-3 items-center text-lg text-[var(--gral)]">
                        <ElectricIcon className="w-5 h-auto" />
                        <p>Bilen er elektrisk</p> 
                    </ul>
                    )}

                    <h1 className="font-medium text-2xl">Præferencer</h1>
                    <div>
                        <div className="grid grid-cols-2 gap-5">
                            <ul>
                            <li className="flex items-center gap-2">
                                {trip.allowMusic ? (
                                <CheckIcon className="w-5 h-5" />
                                ) : (
                                <CrossIcon className="w-5 h-5" />
                                )}
                                <span>Musik</span>
                            </li>
                            </ul>

                            <ul>
                            <li className="flex items-center gap-2">
                                {trip.allowSmoking ? (
                                <CheckIcon className="w-5 h-5" />
                                ) : (
                                <CrossIcon className="w-5 h-5" />
                                )}
                                <span>Rygning</span>
                            </li>
                            </ul>

                            <ul>
                            <li className="flex items-center gap-2">
                                {trip.allowPets ? (
                                <CheckIcon className="w-5 h-5" />
                                ) : (
                                <CrossIcon className="w-5 h-5" />
                                )}
                                <span>Kæledyr</span>
                            </li>
                            </ul>

                            <ul>
                            <li className="flex items-center gap-2">
                                {trip.allowChildren ? (
                                <CheckIcon className="w-5 h-5" />
                                ) : (
                                <CrossIcon className="w-5 h-5" />
                                )}
                                <span>Børn</span>
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};