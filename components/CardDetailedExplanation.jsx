import React from "react";
import Image from "next/image";
export default function CardDetailedExplanation({ selectedCard }) {
  return (
    <div className="grid grid-cols-2 items-center justify-center content-center my-auto">
      <div className="relative mt-2 p-2  border-gray-300 rounded-md overflow-hidden  w-96 h-96 m-auto shadow-lg shadow-orange-300">
        <Image
          src={`/Speak_Cards/${selectedCard.id}.jpg`}
          alt={selectedCard.name}
          fill
          className=" object-fit"
        />
      </div>
      <div className="ml-20">
        <div className="flex-col mb-3">
          <div>{selectedCard.name}</div>
          <div>{selectedCard.Type}</div>
          <div>{selectedCard.Realm}</div>
          <div>{selectedCard.WordCost}</div>
          <div>{selectedCard.Description}</div>
        </div>
        <p className="mb-4">
          Hint 1: This card can reduce the DP of an opponent´s creature only
          during your own turn, but in any of the phases.
        </p>
        <p>Hint 2: Do not forget to use it!</p>
      </div>
    </div>
  );
}
