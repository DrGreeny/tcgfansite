import React, { useState } from "react";
import cardsData from "../db/cards.json";
import Image from "next/image";
import CardDetailedExplanation from "./CardDetailedExplanation";

const CardExplain = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [showAllCards, setShowAllCards] = useState(false);
  const [filterType, setFilterType] = useState(null);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setSelectedCard(null);
    setShowAllCards(false);
  };

  const handleCardSelect = (card) => {
    setSelectedCard(card);
    setShowAllCards(false);
    setSearchQuery("");
  };

  const toggleShowAllCards = () => {
    setShowAllCards(!showAllCards);
    setSelectedCard(null);
  };

  const handleFilterType = (type) => {
    setFilterType(type);
  };

  const filteredCards = showAllCards
    ? cardsData
    : cardsData.filter((card) => card.name.toLowerCase().includes(searchQuery));

  const filteredCardsWithType = filterType
    ? filteredCards.filter((card) => card.Type === filterType)
    : filteredCards;

  return (
    <div className="text-white">
      <div className="p-4">
        <div className="flex justify-center ">
          <div className="">
            <h2 className="text-lg font-bold m-2">Search for your card</h2>
            <input
              type="text"
              placeholder="Search for a card"
              value={searchQuery}
              onChange={handleSearchChange}
              className=" text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {searchQuery.length >= 3 && (
              <div className="mt-2 ">
                {filteredCards.map((card) => (
                  <div
                    key={card.tokenId}
                    onClick={() => handleCardSelect(card)}
                    className="cursor-pointer p-2 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    {card.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={toggleShowAllCards}
            className="px-4 py-2 text-white rounded-md bg-gradient-to-r from-orange-500 to-gray-500 hover:from-violet-800 hover:to-gray-800 h-10"
          >
            {showAllCards ? "Hide All Cards" : "Show All Cards"}
          </button>
          {!showAllCards ? null : (
            <div className="flex gap-4">
              <div>Select Type</div>
              <select
                onChange={(e) => handleFilterType(e.target.value)}
                value={filterType || ""}
                className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">All Types</option>
                <option value="Hero">Hero</option>
                <option value="Creature">Creature</option>
                <option value="Spell">Spell</option>
                <option value="Curse">Curse</option>
                <option value="Realm">Realm</option>
              </select>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        {selectedCard && !showAllCards && (
          <CardDetailedExplanation selectedCard={selectedCard} />
        )}
        {showAllCards && (
          <div className="mt-4 flex flex-wrap gap-4">
            {filteredCardsWithType.map((card) => (
              <div
                key={card.tokenId}
                className="cursor-pointer w-24 h-24 bg-cover bg-center text-white flex items-center justify-center hover:scale-110 duration-100"
                style={{
                  backgroundImage: `url(/Speak_Cards/${card.tokenId}.jpg)`,
                }}
                onClick={() => handleCardSelect(card)}
              >
                {card.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardExplain;
