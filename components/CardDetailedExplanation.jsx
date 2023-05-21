import React from "react";
import Image from "next/image";

export default function CardDetailedExplanation({ selectedCard }) {
  const hasValidExplanations =
    selectedCard.explanations &&
    selectedCard.explanations.length > 0 &&
    selectedCard.explanations.some((explanation) => explanation.trim() !== "");

  return (
    <div className="grid grid-cols-2 items-center justify-center content-center my-auto">
      <div className="relative mt-2 p-2 border-gray-300 rounded-md overflow-hidden w-96 h-96 m-auto shadow-lg shadow-orange-300">
        <Image
          src={`/Speak_Cards/${selectedCard.id}.jpg`}
          alt={selectedCard.name}
          fill
          className="object-fit"
        />
      </div>
      <div className="ml-20">
        <div className="flex-col mb-3">
          <div className="text-4xl">{selectedCard.name}</div>
          <div className="flex gap-x-4 italic">
            <div>{selectedCard.Type}</div>
            <div>{selectedCard.Realm.map((realm) => realm).join(", ")}</div>
          </div>

          <div>
            <span className="italic">Word cost: </span>
            <span className="font-bold">{selectedCard.WordCost}</span>
          </div>
          <div className="my-4 mr-5">{selectedCard.Description}</div>
        </div>
        {hasValidExplanations && (
          <>
            {selectedCard.explanations
              .filter((explanation) => explanation.trim() !== "")
              .map((explanation, index) => (
                <div
                  key={index}
                  className="shadow-lg shadow-white p-2 mr-5 my-10 bg-gradient-to-br from-[#081C34] via-[#BC4618] to-[#E6C463] whitespace-pre-line"
                >
                  <p className="mb-4">
                    Exp. {index + 1}: {explanation}
                  </p>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
}
