import React, { useState } from "react";
import cards from "../db/cards.json";
import SaveDeck from "./SaveDeck";

const DeckBuilder = () => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSelectedCards, setFilterSelectedCards] = useState(false);
  const [selectedRealms, setSelectedRealms] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleCardClick = (card) => {
    const existingCard = selectedCards.find((c) => c.name === card.name);

    if (existingCard) {
      if (existingCard.Type === "Hero") return;
      if (existingCard.count < 3) {
        const updatedCards = selectedCards.map((c) =>
          c.name === card.name ? { ...c, count: c.count + 1 } : c
        );
        setSelectedCards(updatedCards);
      }
    } else {
      const newCard = { ...card, count: 1 };

      // Check if a card with the type "Hero" already exists in selected cards
      const heroCard = selectedCards.find((c) => c.Type === "Hero");

      if (card.Type === "Hero") {
        if (heroCard) {
          // Only allow one card with type "Hero" and set its count to one
          return;
        } else {
          // Set the count of the new "Hero" card to one
          newCard.count = 1;
        }
      }

      setSelectedCards([...selectedCards, newCard]);
    }
  };

  const handleRemoveCard = (card) => {
    const updatedCards = selectedCards
      .map((c) => (c.name === card.name ? { ...c, count: c.count - 1 } : c))
      .filter((c) => c.count > 0);

    setSelectedCards(updatedCards);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleRealmSelect = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value.toLowerCase()
    );

    setSelectedRealms(selectedOptions);
  };

  const handleTypeSelect = (event) => {
    const type = event.target.name.toLowerCase();
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedTypes([...selectedTypes, type]);
    } else {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    }
  };

  const filteredCards = cards.filter((card) => {
    const name = card.name.toLowerCase();
    const type = card.Type ? card.Type.toLowerCase() : "";
    const cardRealms = card.Realm
      ? card.Realm.map((realm) => realm.toLowerCase())
      : [];

    if (selectedRealms.length > 0 && !selectedRealms.includes("all")) {
      const matchingRealms = cardRealms.filter((realm) =>
        selectedRealms.includes(realm)
      );
      if (matchingRealms.length === 0) {
        return false;
      }
    }

    if (
      selectedTypes.length > 0 &&
      !selectedTypes.includes(type.toLowerCase())
    ) {
      return false;
    }

    return (
      name.includes(searchQuery.toLowerCase()) ||
      type.includes(searchQuery.toLowerCase())
    );
  });

  const filteredSelectedCards = selectedCards.filter((card) => {
    const name = card.name.toLowerCase();
    const type = card.Type ? card.Type.toLowerCase() : "";
    const cardRealms = card.Realm
      ? card.Realm.map((realm) => realm.toLowerCase())
      : [];

    if (
      filterSelectedCards &&
      selectedRealms.length > 0 &&
      !selectedRealms.includes("all")
    ) {
      const matchingRealms = selectedRealms.filter((realm) =>
        cardRealms.includes(realm)
      );
      if (matchingRealms.length === 0) {
        return false;
      }
    }

    if (
      filterSelectedCards &&
      selectedTypes.length > 0 &&
      !selectedTypes.includes(type.toLowerCase())
    ) {
      return false;
    }

    return (
      name.includes(searchQuery.toLowerCase()) ||
      type.includes(searchQuery.toLowerCase())
    );
  });

  const countByType = (type) => {
    return selectedCards.reduce((count, card) => {
      if (card.Type && card.Type.toLowerCase() === type.toLowerCase()) {
        return count + card.count;
      }
      return count;
    }, 0);
  };

  return (
    <div className="p-4">
      <div className="bg-black text-white flex gap-3 p-2 sticky top-0">
        <div className="flex-col h-full justify-between">
          <input
            type="text"
            placeholder="Search cards..."
            className="p-2 border rounded w-full"
            value={searchQuery}
            onChange={handleSearch}
          />
          <label className="flex items-center">
            Filter Deck cards
            <input
              type="checkbox"
              className="ml-2"
              checked={filterSelectedCards}
              onChange={(e) => setFilterSelectedCards(e.target.checked)}
            />
          </label>
        </div>
        <div className="flex gap-6">
          <div className="">
            <label className="block">Filter by Realm:</label>
            <select
              multiple
              className="p-2 border rounded w-full text-black"
              onChange={handleRealmSelect}
            >
              <option value="all">All</option>
              <option value="Angelic">Angelic</option>
              <option value="Mythic">Mythic</option>
              <option value="Human">Human</option>
              <option value="Demonic">Demonic</option>
              <option value="Undead">Undead</option>
              <option value="Dragon">Dragon</option>
              <option value="Beast">Beast</option>
              <option value="Cosmic">Cosmic</option>
            </select>
          </div>
          <div className="">
            <label className="block">Filter by Type:</label>
            <label className="block">
              <input
                type="checkbox"
                name="hero"
                checked={selectedTypes.includes("hero")}
                onChange={handleTypeSelect}
              />
              Hero
            </label>
            <label className="block">
              <input
                type="checkbox"
                name="creature"
                checked={selectedTypes.includes("creature")}
                onChange={handleTypeSelect}
              />
              Creature
            </label>
            <label className="block">
              <input
                type="checkbox"
                name="spell"
                checked={selectedTypes.includes("spell")}
                onChange={handleTypeSelect}
              />
              Spell
            </label>
            <label className="block">
              <input
                type="checkbox"
                name="curse"
                checked={selectedTypes.includes("curse")}
                onChange={handleTypeSelect}
              />
              Curse
            </label>
          </div>
        </div>
        <div>
          Deck Overview
          <div>
            <p>Overall Card Count: {selectedCards.length}</p>
            <p>Heros: {countByType("hero")}</p>
            <p>Creatures: {countByType("creature")}</p>
            <p>Curses: {countByType("curse")}</p>
            <p>Spells: {countByType("spell")}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-bold">All Cards</h2>
          <div className="flex flex-wrap gap-4">
            {filteredCards.map((card) => (
              <div
                key={card.name}
                className="p-1 border rounded cursor-pointer flex-col w-32 h-32 overflow-hidden"
                onClick={() => handleCardClick(card)}
              >
                <div className="flex justify-between w-full">
                  <p className=" text-sm font-bold ">{card.WordCost}</p>
                  {card.DP && card.HP ? (
                    <p className=" text-sm font-bold ">
                      {card.DP} / {card.HP}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>

                <p className="w-full text-sm font-bold">{card.name}</p>
                <p className="w-full text-xs italic">{card.Type}</p>
                <p className="w-full text-xs">{card.Description}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold">Deck Cards</h2>
          <SaveDeck selectedCards={selectedCards} />

          <div className="flex flex-col flex-wrap gap-4">
            <h3>Hero</h3>
            <div className="flex gap-2 flex-wrap">
              {filteredSelectedCards
                .filter((card) => card.Type === "Hero")
                .map((card) => (
                  <div
                    key={card.name}
                    className="p-2 border  rounded mb-2 flex-col justify-between overflow-hidden items-center w-32 h-32"
                  >
                    <div className="flex justify-between w-full">
                      <p className=" text-sm font-bold ">{card.WordCost}</p>
                      <p className=" text-sm font-bold ">
                        {card.DP} / {card.HP}
                      </p>
                    </div>

                    <p className="w-full text-sm font-bold">
                      {card.name} ({card.count})
                    </p>
                    <p className="w-full text-xs italic">{card.Type}</p>
                    <p className="w-full text-xs">{card.Description}</p>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => handleCardClick(card)}
                    >
                      Add
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleRemoveCard(card)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
            </div>
            <h3>Creature</h3>
            <div className="flex gap-2 flex-wrap">
              {filteredSelectedCards
                .filter((card) => card.Type === "Creature")
                .map((card) => (
                  <div
                    key={card.name}
                    className="p-2 border rounded overflow-hidden mb-2 flex-col justify-between items-center w-32 h-32"
                  >
                    <div className="flex justify-between w-full">
                      <p className=" text-sm font-bold ">{card.WordCost}</p>
                      {card.DP && card.HP ? (
                        <p className=" text-sm font-bold ">
                          {card.DP} / {card.HP}
                        </p>
                      ) : (
                        <></>
                      )}
                    </div>

                    <p className="w-full text-sm font-bold">
                      {card.name} ({card.count})
                    </p>
                    <p className="w-full text-xs italic">{card.Type}</p>
                    <p className="w-full text-xs">{card.Description}</p>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => handleCardClick(card)}
                    >
                      Add
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleRemoveCard(card)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
            </div>
            <h3>Spell</h3>
            <div className="flex gap-2 flex-wrap">
              {filteredSelectedCards
                .filter((card) => card.Type === "Spell")
                .map((card) => (
                  <div
                    key={card.name}
                    className="p-2 border rounded overflow-hidden mb-2 flex-col justify-between items-center w-32 h-32"
                  >
                    <div className="flex justify-between w-full">
                      <p className=" text-sm font-bold ">{card.WordCost}</p>
                      {card.DP && card.HP ? (
                        <p className=" text-sm font-bold ">
                          {card.DP} / {card.HP}
                        </p>
                      ) : (
                        <></>
                      )}
                    </div>

                    <p className="w-full text-sm font-bold">
                      {card.name} ({card.count})
                    </p>
                    <p className="w-full text-xs italic">{card.Type}</p>
                    <p className="w-full text-xs">{card.Description}</p>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => handleCardClick(card)}
                    >
                      Add
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleRemoveCard(card)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
            </div>
            <h3>Curse</h3>
            <div className="flex gap-2 flex-wrap">
              {filteredSelectedCards
                .filter((card) => card.Type === "Curse")
                .map((card) => (
                  <div
                    key={card.name}
                    className="p-2 border rounded overflow-hidden mb-2 flex-col justify-between items-center w-32 h-32"
                  >
                    <div className="flex justify-between w-full">
                      <p className=" text-sm font-bold ">{card.WordCost}</p>
                      {card.DP && card.HP ? (
                        <p className=" text-sm font-bold ">
                          {card.DP} / {card.HP}
                        </p>
                      ) : (
                        <></>
                      )}
                    </div>

                    <p className="w-full text-sm font-bold">
                      {card.name} ({card.count})
                    </p>
                    <p className="w-full text-xs italic">{card.Type}</p>
                    <p className="w-full text-xs">{card.Description}</p>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => handleCardClick(card)}
                    >
                      Add
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleRemoveCard(card)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeckBuilder;
