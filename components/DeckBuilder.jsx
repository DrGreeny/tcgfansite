import React, { useState, useEffect } from "react";
import cards from "../db/cards.json";
import SaveDeck from "./SaveDeck";
import Image from "next/image";
import Range from "rc-slider";
import "rc-slider/assets/index.css";

const DeckBuilder = () => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSelectedCards, setFilterSelectedCards] = useState(false);
  const [selectedRealms, setSelectedRealms] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null); // New state variable for the hovered card
  const [wordCostRange, setWordCostRange] = useState([0, 10]);

  // Function to load selected cards from local storage
  const loadSelectedCards = () => {
    const storedCards = localStorage.getItem("selectedCards");
    if (storedCards) {
      setSelectedCards(JSON.parse(storedCards));
    }
  };

  // Load selected cards from local storage when the component mounts
  useEffect(() => {
    loadSelectedCards();
  }, []);

  // Save selected cards to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("selectedCards", JSON.stringify(selectedCards));
  }, [selectedCards]);

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
  function handleImportJson(event) {
    const file = event.target.files[0];

    // Check file extension
    if (!file.name.endsWith(".json")) {
      alert("Invalid file format. Please select a JSON file.");
      return;
    }

    // Read file content
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        // Parse file content as JSON
        const jsonData = JSON.parse(e.target.result);

        // Extract the IDs and counts from the JSON data
        const idCountMap = new Map(
          jsonData.map((item) => [item.tokenId, item.count])
        );

        // Create selectedCards based on the IDs and update the count property
        const updatedSelectedCards = cards
          .filter((card) => idCountMap.has(card.tokenId))
          .map((card) => ({
            ...card,
            count: idCountMap.get(card.tokenId),
          }));

        setSelectedCards(updatedSelectedCards);
      } catch (error) {
        alert("Invalid JSON format. Please select a valid JSON file.");
      }
    };
    reader.readAsText(file);
  }

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

  const filteredCards = cards
    .filter((card) => {
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
    })
    .filter(
      (card) =>
        card.WordCost >= wordCostRange[0] && card.WordCost <= wordCostRange[1]
    );

  const filteredSelectedCards = selectedCards
    .filter((card) => {
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
    })
    .filter(
      (card) =>
        card.WordCost >= wordCostRange[0] && card.WordCost <= wordCostRange[1]
    );

  const countByType = (type) => {
    return selectedCards.reduce((count, card) => {
      if (card.Type && card.Type.toLowerCase() === type.toLowerCase()) {
        return count + card.count;
      }
      return count;
    }, 0);
  };

  const handleCardHover = (card) => {
    setHoveredCard(card);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  // Helper function to calculate the total WordCost of a card type
  const calculateTotalWordCost = (type) => {
    return selectedCards
      .filter((card) => card.Type === type)
      .reduce((total, card) => total + card.WordCost * card.count, 0);
  };

  // Calculate the WordCost for creature, spell, and curse types
  const creatureWordCost = calculateTotalWordCost("Creature");
  const spellWordCost = calculateTotalWordCost("Spell");
  const curseWordCost = calculateTotalWordCost("Curse");

  // Calculate the total WordCost for all selected cards
  const totalWordCost = selectedCards.reduce(
    (total, card) => total + card.WordCost,
    0
  );

  function getCountByTypeAndAttribute(cards, type, attribute) {
    return cards
      .filter(
        (card) =>
          card["Type"] === type && card["Continuous/ Equip"] === attribute
      )
      .reduce((total, card) => total + card.count, 0);
  }
  const equipSpellsCount = getCountByTypeAndAttribute(
    selectedCards,
    "Spell",
    "Equip"
  );
  const equipCursesCount = getCountByTypeAndAttribute(
    selectedCards,
    "Curse",
    "Equip"
  );
  const singleSpellsCount = getCountByTypeAndAttribute(
    selectedCards,
    "Spell",
    "Single"
  );
  const singleCursesCount = getCountByTypeAndAttribute(
    selectedCards,
    "Curse",
    "Single"
  );
  const continuousSpellsCount = getCountByTypeAndAttribute(
    selectedCards,
    "Spell",
    "Continuous"
  );
  const continuousCursesCount = getCountByTypeAndAttribute(
    selectedCards,
    "Curse",
    "Continuous"
  );
  const handleSliderChange = (values) => {
    setWordCostRange(values);
  };
  return (
    <div className="h-screen">
      <div className="grid grid-cols-5 text-white text-sm sticky top-0 bg-black h-52 border-b-4 z-10">
        <div className="col-span-2 ">
          <div className="flex justify-center p-2">
            <h3 className="font-bold">Filter Options</h3>
          </div>

          <div className="bg-black text-white p-2">
            <div className="flex justify-around">
              <div className="">
                <label className="block">Filter by Realm:</label>
                <select
                  multiple
                  className="p-2 rounded w-full text-white bg-black"
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
                <label className="block">
                  <input
                    type="checkbox"
                    name="realm"
                    checked={selectedTypes.includes("realm")}
                    onChange={handleTypeSelect}
                  />
                  Realm
                </label>
              </div>
              <div className=" flex-col">
                <div>
                  <p>
                    Word Cost Range: {wordCostRange[0]} - {wordCostRange[1]}
                  </p>
                  {/* Add the range slider component */}
                  <Range
                    range
                    min={0}
                    max={10}
                    value={wordCostRange}
                    onChange={handleSliderChange}
                  />
                </div>
                <div className="flex mt-2">
                  <input
                    type="text"
                    placeholder="Search cards..."
                    className="p-2 rounded text-black h-6"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
                <div className="flex-col h-full justify-between mt-2">
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
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <div className="col-span-1 p-2 overflow-hidden  bg-gradient-to-r from-[#081C34] via-[#BC4618] to-[#E6C463]  mb-1 rounded-lg">
          {hoveredCard && (
            <div className="flex-col w-full items-center text-xs/[0.9]">
              <div className="w-full flex justify-center">
                <div className="mb-1 mx-auto text-lg">{hoveredCard.name}</div>
                <div className="text-lg">{hoveredCard.WordCost}</div>
              </div>
              <div className="flex-col items-center">
                <div className="flex justify-center w-full h-24 ">
                  <Image
                    className="aboslute object-cover"
                    src={`/Speak_Cards/${hoveredCard.tokenId}.jpg`}
                    alt={hoveredCard.name}
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex justify-between">
                  <div className="italic ">{hoveredCard.Type}</div>
                  <div className="italic my-1 ">
                    DP {hoveredCard.DP} / HP {hoveredCard.HP}
                  </div>
                </div>
                <div className="">
                  <p>{hoveredCard.Description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-2 p-2 flex-col bg-black">
          <div className="flex justify-center mb-4 font-bold">
            <h3 className="">Data and Statistics</h3>
          </div>

          <div className="flex gap-1 justify-around text-xs">
            <div className="">
              {/*grid grid-cols-2 gap-x-2 */}
              <p>
                Overall Card Count:{" "}
                {selectedCards.reduce((count, card) => count + card.count, 0)}
              </p>
              <p className="">Heros:{countByType("hero")}</p>
              <p>Creatures:{countByType("creature")}</p>
              <p>Curses:{countByType("curse")}</p>
              <p>Spells: {countByType("spell")}</p>
              <p>Realms: {countByType("realm")}</p>
            </div>

            <div className="">
              {/*grid grid-cols-2 gap-x-2*/}
              <p className="">Creature WordCost: {creatureWordCost}</p>
              <p className="">Spell WordCost: {spellWordCost}</p>
              <p className="">Curse WordCost:{curseWordCost}</p>
              <p className="">Total WordCost: {totalWordCost}</p>
            </div>
            <div className="text-white ">
              <p>Equip Spells: {equipSpellsCount}</p>
              <p>Equip Curses: {equipCursesCount}</p>
              <p>Single Spells: {singleSpellsCount}</p>
              <p>Single Curses: {singleCursesCount}</p>
              <p>Continuous Spells:{continuousSpellsCount}</p>
              <p>Continuous Curses:{continuousCursesCount}</p>
            </div>
          </div>
          <div className="flex justify-center mt-4 gap-x-4 items-center">
            <SaveDeck selectedCards={selectedCards} />
            <button
              className="px-4 py-1 ml-2 bg-red-500 text-white rounded"
              onClick={() => setSelectedCards([])}
            >
              Clear deck
            </button>
            <div className="cursor-pointer">
              <label
                htmlFor="import-json"
                className="relative border border-orange-600 px-4 py-1 rounded-md text-white"
              >
                <span className="inline-block ">Import Json</span>
                <input
                  id="import-json"
                  type="file"
                  accept=".json"
                  onChange={handleImportJson}
                  className="opacity-0 absolute top-0 left-0 w-full h-full "
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-around">
        <div className="flex justify-center mb-3">
          <h2 className="text-lg font-bold text-white">All Cards</h2>
        </div>
        <div className="flex justify-center mb-3">
          <h2 className="text-lg font-bold text-white">Your Deck</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-[600px]">
          <div className="flex flex-wrap gap-4 sticky top-64 h-full overflow-y-auto">
            {filteredCards.map((card) => (
              <div
                key={card.name}
                className="p-1 border rounded cursor-pointer flex-col w-32 h-32 overflow-hidden text-white "
                onClick={() => handleCardClick(card)}
                onMouseEnter={() => handleCardHover(card)}
                style={{
                  backgroundImage: `url(/Speak_Cards/${card.tokenId}.jpg)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="flex justify-between w-full">
                  <p className=" text-xs font-bold ">{card.WordCost}</p>
                  {card.DP && card.HP ? (
                    <p className=" text-xs font-bold ">
                      {card.DP} / {card.HP}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>

                <p className="w-full text-xs font-bold">{card.name}</p>
                <p className="w-full text-[0.60rem] italic">{card.Type}</p>
                {/* <p className="w-full text-[0.60rem]">{card.Description}</p> */}
              </div>
            ))}
          </div>
        </div>
        <div className="h-[600px]">
          <div className=" flex-col flex-wrap gap-4 sticky top-64 h-full overflow-y-auto pr-2">
            {filteredSelectedCards.some((card) => card.Type === "Hero") ? (
              <div className="border-gray-400 border-b px-2 font-bold my-1">
                <h3 className="text-gray-300">Hero</h3>
              </div>
            ) : null}

            <div className="flex gap-2 flex-wrap">
              {filteredSelectedCards
                .filter((card) => card.Type === "Hero")
                .map((card) => (
                  <div
                    key={card.name}
                    className="relative p-1 rounded mb-2 flex-col overflow-hidden items-center w-32 h-32 text-white shadow-md shadow-white"
                    onMouseEnter={() => handleCardHover(card)}
                    style={{
                      backgroundImage: `url(/Speak_Cards/${card.tokenId}.jpg)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="flex justify-between w-full">
                      <p className=" text-xs font-bold ">{card.WordCost}</p>
                      {card.DP && card.HP ? (
                        <p className=" text-xs font-bold ">
                          {card.DP} / {card.HP}
                        </p>
                      ) : (
                        <></>
                      )}
                    </div>

                    <p className="w-full text-xs font-bold">{card.name}</p>
                    <p className="w-full text-[0.60rem] italic">{card.Type}</p>
                    {/* <p className="w-full text-[0.60rem]">{card.Description}</p> */}
                    <div className="absolute flex bottom-0 justify-between w-full">
                      <div className="-translate-x-1">
                        <button
                          className="bg-gray-400 text-white font-bold h-7 w-7 opacity-80"
                          onClick={() => handleCardClick(card)}
                        >
                          +
                        </button>
                        <button
                          className="bg-gray-600  text-white font-bold h-7 w-7 opacity-80"
                          onClick={() => handleRemoveCard(card)}
                        >
                          -
                        </button>
                      </div>
                      <div className="bg-gray-600  text-red-600 font-bold h-7 w-7  text-center">
                        {card.count}
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {filteredSelectedCards.some((card) => card.Type === "Creature") ? (
              <div className="border-gray-400 border-b px-2 font-bold my-1">
                <h3 className="text-gray-300">Creatures</h3>
              </div>
            ) : null}
            <div className="flex gap-2 flex-wrap">
              {filteredSelectedCards
                .filter((card) => card.Type === "Creature")
                .map((card) => (
                  <div
                    key={card.name}
                    className="relative p-1  rounded mb-2 flex-col justify-between overflow-hidden items-center w-32 h-32 text-white shadow-md shadow-white"
                    onMouseEnter={() => handleCardHover(card)}
                    style={{
                      backgroundImage: `url(/Speak_Cards/${card.tokenId}.jpg)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="flex justify-between w-full">
                      <p className=" text-xs font-bold ">{card.WordCost}</p>
                      {card.DP && card.HP ? (
                        <p className=" text-xs font-bold ">
                          {card.DP} / {card.HP}
                        </p>
                      ) : (
                        <></>
                      )}
                    </div>

                    <p className="w-full text-xs font-bold">
                      {card.name} ({card.count})
                    </p>
                    <p className="w-full text-[0.60rem] italic">{card.Type}</p>
                    {/* <p className="w-full text-[0.60rem]">{card.Description}</p> */}
                    <div className="absolute flex bottom-0 justify-between w-full">
                      <div className="-translate-x-1">
                        <button
                          className="bg-gray-400 text-white font-bold h-7 w-7 opacity-80"
                          onClick={() => handleCardClick(card)}
                        >
                          +
                        </button>
                        <button
                          className="bg-gray-600  text-white font-bold h-7 w-7 opacity-80"
                          onClick={() => handleRemoveCard(card)}
                        >
                          -
                        </button>
                      </div>
                      <div className="bg-gray-600  text-red-500 font-bold h-7 w-7 text-center">
                        {card.count}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {filteredSelectedCards.some((card) => card.Type === "Spell") ? (
              <div className="border-gray-400 border-b px-2 font-bold my-1">
                <h3 className="text-gray-300">Spells</h3>
              </div>
            ) : null}
            <div className="flex gap-2 flex-wrap">
              {filteredSelectedCards
                .filter((card) => card.Type === "Spell")
                .map((card) => (
                  <div
                    key={card.name}
                    className="relative p-1 rounded mb-2 flex-col justify-between overflow-hidden items-center w-32 h-32 text-white shadow-md shadow-white"
                    onMouseEnter={() => handleCardHover(card)}
                    style={{
                      backgroundImage: `url(/Speak_Cards/${card.tokenId}.jpg)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="flex justify-between w-full">
                      <p className=" text-xs font-bold ">{card.WordCost}</p>
                      {card.DP && card.HP ? (
                        <p className=" text-xs font-bold ">
                          {card.DP} / {card.HP}
                        </p>
                      ) : (
                        <></>
                      )}
                    </div>

                    <p className="w-full text-xs font-bold">
                      {card.name} ({card.count})
                    </p>
                    <p className="w-full text-[0.60rem] italic">{card.Type}</p>
                    {/*  <p className="w-full text-[0.60rem]">{card.Description}</p> */}
                    <div className="absolute flex bottom-0 justify-between w-full">
                      <div className="-translate-x-1">
                        <button
                          className="bg-gray-400 text-white font-bold h-7 w-7 opacity-80"
                          onClick={() => handleCardClick(card)}
                        >
                          +
                        </button>
                        <button
                          className="bg-gray-600  text-white font-bold h-7 w-7 opacity-80"
                          onClick={() => handleRemoveCard(card)}
                        >
                          -
                        </button>
                      </div>
                      <div className="bg-gray-600  text-red-500 font-bold h-7 w-7 text-center">
                        {card.count}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {filteredSelectedCards.some((card) => card.Type === "Curse") ? (
              <div className="border-gray-400 border-b px-2 font-bold my-1">
                <h3 className="text-gray-300">Curses</h3>
              </div>
            ) : null}
            <div className="flex gap-2 flex-wrap">
              {filteredSelectedCards
                .filter((card) => card.Type === "Curse")
                .map((card) => (
                  <div
                    key={card.name}
                    className="relative p-1 rounded mb-2 flex-col justify-between overflow-hidden items-center w-32 h-32 text-white shadow-md shadow-white"
                    onMouseEnter={() => handleCardHover(card)}
                    style={{
                      backgroundImage: `url(/Speak_Cards/${card.tokenId}.jpg)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="flex justify-between w-full">
                      <p className=" text-xs font-bold ">{card.WordCost}</p>
                      {card.DP && card.HP ? (
                        <p className=" text-xs font-bold ">
                          {card.DP} / {card.HP}
                        </p>
                      ) : (
                        <></>
                      )}
                    </div>

                    <p className="w-full text-xs font-bold">
                      {card.name} ({card.count})
                    </p>
                    <p className="w-full text-[0.60rem] italic">{card.Type}</p>
                    {/* <p className="w-full text-[0.60rem]">{card.Description}</p> */}
                    <div className="absolute flex bottom-0 justify-between w-full">
                      <div className="-translate-x-1">
                        <button
                          className="bg-gray-400 text-white font-bold h-7 w-7 opacity-80"
                          onClick={() => handleCardClick(card)}
                        >
                          +
                        </button>
                        <button
                          className="bg-gray-600  text-white font-bold h-7 w-7 opacity-80"
                          onClick={() => handleRemoveCard(card)}
                        >
                          -
                        </button>
                      </div>
                      <div className="bg-gray-600  text-red-500 font-bold h-7 w-7 text-center">
                        {card.count}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {filteredSelectedCards.some((card) => card.Type === "Realm") ? (
              <div className="border-gray-400 border-b px-2 font-bold my-1">
                <h3 className="text-gray-300">Realms</h3>
              </div>
            ) : null}
            <div className="flex gap-2 flex-wrap">
              {filteredSelectedCards
                .filter((card) => card.Type === "Realm")
                .map((card) => (
                  <div
                    key={card.name}
                    className="relative p-1 rounded mb-2 flex-col justify-between overflow-hidden items-center w-32 h-32 text-white shadow-md shadow-white"
                    onMouseEnter={() => handleCardHover(card)}
                    style={{
                      backgroundImage: `url(/Speak_Cards/${card.tokenId}.jpg)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="flex justify-between w-full">
                      <p className=" text-xs font-bold ">{card.WordCost}</p>
                      {card.DP && card.HP ? (
                        <p className=" text-xs font-bold ">
                          {card.DP} / {card.HP}
                        </p>
                      ) : (
                        <></>
                      )}
                    </div>

                    <p className="w-full text-xs font-bold">
                      {card.name} ({card.count})
                    </p>
                    <p className="w-full text-[0.60rem] italic">{card.Type}</p>
                    <p className="w-full text-[0.60rem]">{card.Description}</p>
                    <div className="absolute flex bottom-0 justify-between w-full">
                      <div className="-translate-x-1">
                        <button
                          className="bg-gray-400 text-white font-bold h-7 w-7 opacity-80"
                          onClick={() => handleCardClick(card)}
                        >
                          +
                        </button>
                        <button
                          className="bg-gray-600  text-white font-bold h-7 w-7 opacity-80"
                          onClick={() => handleRemoveCard(card)}
                        >
                          -
                        </button>
                      </div>
                      <div className="bg-gray-600  text-red-500 font-bold h-7 w-7 text-center">
                        {card.count}
                      </div>
                    </div>
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
