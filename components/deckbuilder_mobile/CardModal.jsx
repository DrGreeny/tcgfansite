import Image from "next/image";
import React from "react";

export default function CardModal({
  handleCloseModal,
  selectedCard,
  addCard,
  deck,
}) {
  const hasValidExplanations =
    selectedCard.explanations &&
    selectedCard.explanations.length > 0 &&
    selectedCard.explanations.some((explanation) => explanation.trim() !== "");
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-75 flex justify-center items-center text-black">
      <div className="">
        <button
          className="absolute top-0 right-0 p-2 text-white"
          onClick={handleCloseModal}
        >
          X
        </button>
      </div>
      <div className="flex-col bg-white rounded p-1 w-full">
        <div className="flex items-center justify-center content-center my-auto">
          <div className="w-24 flex-col p-1 text-center">
            <div className="w-16 h-16 border rounded text-xs flex flex-col items-center justify-center my-2">
              <h3>deck count</h3>

              {deck.map((card) => {
                if (card.tokenId === selectedCard.tokenId) {
                  return (
                    <h2
                      key={card.tokenId}
                      className={`text-xl ${
                        card.count < 3 && card.count !== 0
                          ? "text-green-500"
                          : card.count === 3
                          ? "text-red-500"
                          : "text-orange-800"
                      }`}
                    >
                      {card.count}
                    </h2>
                  );
                }
              })}
            </div>
            <div
              className="w-16 h-16 border rounded text-xs flex flex-col items-center justify-center my-2"
              onClick={() => addCard(selectedCard)}
            >
              add to deck
            </div>
          </div>
          <div className="flex-col mb-3 p-2">
            <div className="text-4xl">{selectedCard.name}</div>
            <div className="flex gap-x-4 italic">
              <div>{selectedCard.Type}</div>
              <div>{selectedCard.Realm.map((realm) => realm).join(", ")}</div>
            </div>
            <div>
              {selectedCard.Type === "Curse" ||
              selectedCard.Type === "Spell" ? (
                <>
                  <span className="italic">
                    {selectedCard["Continuous/ Equip"]}
                  </span>{" "}
                  &nbsp;
                </>
              ) : null}
            </div>
            <div>
              <span className="italic">Word cost: </span>
              <span className="font-bold">{selectedCard.WordCost}</span>
            </div>
            <div>
              {selectedCard.Type === "Creature" ||
              selectedCard.Type === "Hero" ? (
                <>
                  <span className="italic">DP: </span>
                  <span className="font-bold">{selectedCard.DP}</span> &nbsp;
                  <span className="italic">HP: </span>
                  <span className="font-bold">{selectedCard.HP}</span>
                </>
              ) : null}
            </div>

            <div className="my-4 mr-5 border-t border-b py-4">
              {selectedCard.Description}
            </div>
            {hasValidExplanations && (
              <>
                {selectedCard.explanations
                  .filter((explanation) => explanation.trim() !== "")
                  .map((explanation, index) => (
                    <div
                      key={index}
                      className="shadow-lg p-2 mr-5 my-6 border border-orange-700 rounded whitespace-pre-line"
                    >
                      <p className="m-auto">
                        {index + 1}: {explanation}
                      </p>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
