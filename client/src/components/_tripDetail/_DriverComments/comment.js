//components/_tripDetail/comment.js
"use client"
// Imports
import { CommentIcon } from "@/assets/icons/comment";

export const Comment = ({ trip }) => {

    return (
        
        <div>
            <h1 className="font-semibold text-2xl py-5">Chaufførens kommentar</h1>
            <div className="bg-white p-5 rounded-2xl">
                <div className="flex gap-5 bg-gray">
                    <CommentIcon className="w-40 h-auto" />
                    <p>
                        {trip.comment}
                    </p>
                </div>
            </div>
        </div>
    );
};