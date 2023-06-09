import React, { useState, useEffect } from "react";
import Fliter_mobile from "./Fliter_mobile";
import cards from "../../db/cards.json";
import CardModal from "./CardModal";
import SaveDeck from "../SaveDeck";
import DeckStats from "./DeckStats";

export default function Deckbuilder_mobile() {
  const [activeButton, setActiveButton] = useState("Build");
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null); // Track the selected card for the modal
  const [showCardModal, setShowCardModal] = useState(false);
  const [deck, setDeck] = useState([]);
  const [showSearchField, setShowSearchField] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [cardsFiltered, setCardsFiltered] = useState(cards);
  const [deckFiltered, setDeckFiltered] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [filterSettings, setFilterSettings] = useState({
    selectedRealms: [],
    selectedTypes: [],
    selectedEnchantment: [],
    filterSelectedCards: false,
    wordCostRange: [0, 10],
    dpRange: [0, 20],
    hpRange: [0, 100],
  });

  const addCard = (card) => {
    const existingCard = deck.find((c) => c.name === card.name);

    if (existingCard) {
      if (existingCard.Type === "Hero") return;
      if (existingCard.count < 3) {
        const updatedCards = deck.map((c) =>
          c.name === card.name ? { ...c, count: c.count + 1 } : c
        );
        setDeck(updatedCards);
        const filteredCards = updatedCards.filter(
          (c) =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.Description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.Type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (c.Realm &&
              c.Realm.some((realm) =>
                realm.toLowerCase().includes(searchQuery.toLowerCase())
              )) ||
            (c["Continuous/ Equip"] &&
              c["Continuous/ Equip"]
                .toLowerCase()
                .includes(searchQuery.toLowerCase()))
        );
        setDeckFiltered(filteredCards);
      }
    } else {
      const newCard = { ...card, count: 1 };

      // Check if a card with the type "Hero" already exists in selected cards
      const heroCard = deck.find((c) => c.Type === "Hero");

      if (card.Type === "Hero") {
        if (heroCard) {
          // Only allow one card with type "Hero" and set its count to one
          return;
        } else {
          // Set the count of the new "Hero" card to one
          newCard.count = 1;
        }
      }

      const updatedDeck = [...deck, newCard];
      setDeck(updatedDeck);
      const filteredCards = updatedDeck.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.Description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.Type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (c.Realm &&
            c.Realm.some((realm) =>
              realm.toLowerCase().includes(searchQuery.toLowerCase())
            )) ||
          (c["Continuous/ Equip"] &&
            c["Continuous/ Equip"]
              .toLowerCase()
              .includes(searchQuery.toLowerCase()))
      );
      setDeckFiltered(filteredCards);
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

        setDeck(updatedSelectedCards);
      } catch (error) {
        alert("Invalid JSON format. Please select a valid JSON file.");
      }
    };
    reader.readAsText(file);
    setActiveButton("Deck");
  }

  const handleCardClick = (card) => {
    // Handle long press event here
    setSelectedCard(card);
    setShowCardModal(true);
  };

  const handleRemoveCard = (card) => {
    const updatedCards = deck
      .map((c) => (c.name === card.name ? { ...c, count: c.count - 1 } : c))
      .filter((c) => c.count > 0);

    setDeck(updatedCards);
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleFilterClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleCloseCardModal = () => {
    setShowCardModal(false);
  };
  const handleSearchIconClick = () => {
    setShowSearchField(true);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    /* handleSearchQuery(e.target.value); */
  };
  const handleResetSearch = () => {
    setSearchQuery("");
    /*   setCardsFiltered(cards); // Reset the filtered cards to the original list
    setDeckFiltered(deck); // Reset the filtered deck to the original list */
  };
  const sections = [
    { headline: "Heroes", type: "Hero" },
    { headline: "Creatures", type: "Creature" },
    { headline: "Spells", type: "Spell" },
    { headline: "Curses", type: "Curse" },
    { headline: "Realms", type: "Realm" },
  ];

  const filteredCards = cards
    .filter((card) => {
      const name = card.name.toLowerCase();
      const type = card.Type ? card.Type.toLowerCase() : "";
      const description = card.Description.toLowerCase();
      const enchantment = card["Continuous/ Equip"]
        ? card["Continuous/ Equip"].toLowerCase()
        : "";
      const cardRealms = card.Realm
        ? card.Realm.map((realm) => realm.toLowerCase())
        : [];

      if (
        filterSettings.selectedRealms.length > 0 &&
        !filterSettings.selectedRealms.includes("None")
      ) {
        const matchingRealms = cardRealms.filter((realm) =>
          filterSettings.selectedRealms.includes(realm)
        );
        if (matchingRealms.length === 0) {
          return false;
        }
      }

      if (
        filterSettings.selectedTypes.length > 0 &&
        !filterSettings.selectedTypes.includes(type.toLowerCase())
      ) {
        return false;
      }

      if (
        filterSettings.selectedEnchantment.length > 0 &&
        !filterSettings.selectedEnchantment.includes(enchantment.toLowerCase())
      ) {
        return false;
      }

      return (
        name.includes(searchQuery.toLowerCase()) ||
        type.includes(searchQuery.toLowerCase()) ||
        description.includes(searchQuery.toLowerCase())
      );
    })
    .filter(
      (card) =>
        card.WordCost >= filterSettings.wordCostRange[0] &&
        card.WordCost <= filterSettings.wordCostRange[1] &&
        card.DP >= filterSettings.dpRange[0] &&
        card.DP <= filterSettings.dpRange[1] &&
        card.HP >= filterSettings.hpRange[0] &&
        card.HP <= filterSettings.hpRange[1]
    );

  const filteredSelectedCards = deck
    .filter((card) => {
      const name = card.name.toLowerCase();
      const type = card.Type ? card.Type.toLowerCase() : "";
      const enchantment = card["Continuous/ Equip"]
        ? card["Continuous/ Equip"].toLowerCase()
        : "";
      const cardRealms = card.Realm
        ? card.Realm.map((realm) => realm.toLowerCase())
        : [];

      if (
        filterSettings.filterSelectedCards &&
        filterSettings.selectedRealms.length > 0 &&
        !filterSettings.selectedRealms.includes("None")
      ) {
        const matchingRealms = filterSettings.selectedRealms.filter((realm) =>
          cardRealms.includes(realm)
        );
        if (matchingRealms.length === 0) {
          return false;
        }
      }

      if (
        filterSettings.filterSelectedCards &&
        filterSettings.selectedTypes.length > 0 &&
        !filterSettings.selectedTypes.includes(type.toLowerCase())
      ) {
        return false;
      }

      if (
        filterSettings.filterSelectedCards &&
        filterSettings.selectedEnchantment.length > 0 &&
        !filterSettings.selectedEnchantment.includes(enchantment.toLowerCase())
      ) {
        return false;
      }

      if (filterSettings.filterSelectedCards) {
        return (
          name.includes(searchQuery.toLowerCase()) ||
          type.includes(searchQuery.toLowerCase())
        );
      } else {
        return true; // No filter applied on searchQuery if filterSelectedCards is false
      }
    })
    .filter((card) => {
      if (filterSettings.filterSelectedCards) {
        return (
          card.WordCost >= filterSettings.wordCostRange[0] &&
          card.WordCost <= filterSettings.wordCostRange[1] &&
          card.DP >= filterSettings.dpRange[0] &&
          card.DP <= filterSettings.dpRange[1] &&
          card.HP >= filterSettings.hpRange[0] &&
          card.HP <= filterSettings.hpRange[1]
        );
      } else {
        return true; // No filter applied if filterSelectedCards is false
      }
    });

  return (
    <div className="flex min-h-screen">
      <div className="fixed bg-gray-900 w-16 flex flex-col items-center h-full text-white">
        <button
          className={`my-4 p-2 ${
            activeButton === "Build" ? "bg-gray-800 text-orange-700" : ""
          }`}
          onClick={() => handleButtonClick("Build")}
        >
          Build
        </button>
        <button
          className={`my-4 p-2 ${
            activeButton === "Deck" ? "bg-gray-800 text-orange-700" : ""
          }`}
          onClick={() => handleButtonClick("Deck")}
        >
          Deck
        </button>
        <button
          className={`my-4 p-2 ${
            activeButton === "Import" ? "bg-gray-800 text-orange-700" : ""
          }`}
          onClick={() => handleButtonClick("Import")}
        >
          Import
        </button>
        <button
          className={`my-4 p-2 ${
            activeButton === "Export" ? "bg-gray-800 text-orange-700" : ""
          }`}
          onClick={() => handleButtonClick("Export")}
        >
          Export
        </button>
        <div className="mt-12 flex flex-col itmes-center">
          <button
            className={`my-4 p-2 bg-gray-600 ${
              activeButton === "Filter" ? "bg-gray-800" : ""
            } ${isFilterApplied ? "text-orange-700 font-bold" : ""}`}
            onClick={() => handleButtonClick("Filter")}
          >
            Filter
          </button>
          <button
            className={`my-4 p-2 bg-gray-600 ${
              activeButton === "Export" ? "bg-gray-800 text-orange-700" : ""
            }`}
            onClick={() => handleButtonClick("Stats")}
          >
            Stats
          </button>
        </div>
      </div>
      <div className=" ml-16" style={{ width: "calc(100% - 64px)" }}>
        <div className="flex justify-center   text-black">
          {/*    <button
            className="bg-white w-1/2 rounded-lg mt-1"
            onClick={handleFilterClick}
          >
            Filter
          </button> */}

          {/* Sliding Search Field */}
          {showSearchField && (
            <div className="fixed z-20 top-0 left-16 bg-white text-black flex items-center justify-center h-7">
              <input
                className="px-2 py-1 pr-8"
                placeholder="Search cards..."
                value={searchQuery}
                onChange={handleInputChange}
              />
              {searchQuery && (
                <button
                  className="px-2 py-1 bg-gray-400 hover:bg-gray-300 "
                  onClick={handleResetSearch} // Call the handleResetSearch function on button click
                >
                  X
                </button>
              )}
            </div>
          )}
        </div>

        {/* Content Rows */}
        {activeButton === "Build" && (
          <div className="w-full p-2 text-white flex flex-col justify-between gap-y-2">
            {sections.map((section) => (
              <React.Fragment key={section.type}>
                <h2 className="text-lg font-bold text-white ">
                  {section.headline} &darr;
                </h2>
                <div className="flex overflow-x-auto border-t border-b gap-x-4">
                  {filteredCards.map((card) => {
                    if (card.Type === section.type) {
                      return (
                        <div
                          key={card.tokenId}
                          className="p-1 border rounded cursor-pointer flex-col w-28 h-28 text-white flex-shrink-0"
                          style={{
                            backgroundImage: `url(/Speak_Cards/${card.tokenId}.jpg)`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                          onClick={() => handleCardClick(card)}
                          /* onContextMenu={(e) => {
                            e.preventDefault(); // Disable right-click context menu
                            handleCardLongPress(card);
                          }}
                          onTouchStart={(event) => {
                            const longPressTimer = setTimeout(() => {
                              handleCardLongPress(card);
                            }, 2000);

                            // Store the timer ID in the card element's dataset
                            event.currentTarget.dataset.longPressTimer =
                              longPressTimer;
                          }}
                          onTouchEnd={(e) => {
                            clearTimeout(
                              e.currentTarget.dataset.longPressTimer
                            );
                          }} */
                        >
                          <div className="flex justify-between">
                            <p className="text-xs font-bold">{card.WordCost}</p>
                            {card.DP && card.HP && (
                              <p className="text-xs font-bold">
                                {card.DP} / {card.HP}
                              </p>
                            )}
                          </div>

                          <p className="w-full text-xs font-bold">
                            {card.name}
                          </p>
                          <p className="w-full text-[0.60rem] italic">
                            {card.Type}
                          </p>
                          {/* <p className="w-full text-[0.60rem]">{card.Description}</p> */}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
        {activeButton === "Deck" && (
          <div className="w-full p-2 text-white flex flex-col justify-between gap-y-2">
            {sections.map((section) => (
              <React.Fragment key={section.type}>
                <h2 className="text-lg font-bold text-white">
                  {section.headline}
                </h2>
                <div className="flex overflow-x-auto border-t border-b gap-x-4">
                  {filteredSelectedCards.map((card) => {
                    if (card.Type === section.type) {
                      return (
                        <div
                          key={card.name}
                          className="relative p-1 rounded mb-2 flex-col overflow-hidden items-center w-28 h-28 text-white flex-shrink-0"
                          style={{
                            backgroundImage: `url(/Speak_Cards/${card.tokenId}.jpg)`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                          /*   onContextMenu={(e) => {
                            e.preventDefault(); // Disable right-click context menu
                            handleCardLongPress(card);
                          }} */
                          /*                          onTouchStart={(event) => {
                            const longPressTimer = setTimeout(() => {
                              handleCardLongPress(card);
                            }, 1000);

                            // Store the timer ID in the card element's dataset
                            event.currentTarget.dataset.longPressTimer =
                              longPressTimer;
                          }}
                          onTouchEnd={(e) => {
                            clearTimeout(
                              e.currentTarget.dataset.longPressTimer
                            );
                          }} */
                        >
                          <div className="flex justify-between w-full">
                            <p className=" text-xs font-bold ">
                              {card.WordCost}
                            </p>
                            {card.DP && card.HP ? (
                              <p className=" text-xs font-bold ">
                                {card.DP} / {card.HP}
                              </p>
                            ) : (
                              <></>
                            )}
                          </div>

                          <p className="w-full text-xs font-bold">
                            {card.name}
                          </p>
                          <p className="w-full text-[0.60rem] italic">
                            {card.Type}
                          </p>
                          {/* <p className="w-full text-[0.60rem]">{card.Description}</p> */}
                          <div className="absolute flex bottom-0 justify-between w-full">
                            <div className="-translate-x-1">
                              <button
                                className="bg-gray-400 text-white font-bold h-7 w-7 opacity-80"
                                onClick={() => addCard(card)}
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
                            <div
                              className={`bg-gray-700 font-bold h-7 w-7 text-center ${
                                card.count < 3
                                  ? "text-green-300"
                                  : "text-red-300"
                              }`}
                            >
                              {card.count}
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
        {activeButton === "Import" && (
          <div className="text-white flex justify-center mt-4">
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
        )}
        {activeButton === "Export" && (
          <div className="flex justify-center pt-10">
            <SaveDeck selectedCards={deck} />
          </div>
        )}
        {activeButton === "Filter" && (
          <div className="flex justify-center text-white">
            <Fliter_mobile
              deck={deck}
              setCardsFiltered={setCardsFiltered}
              setDeckFiltered={setDeckFiltered}
              searchQuery={searchQuery}
              filterSettings={filterSettings}
              setFilterSettings={setFilterSettings}
              setIsFilterApplied={setIsFilterApplied}
            />
          </div>
        )}
        {activeButton === "Stats" && (
          <div className="flex justify-center pt-6 text-white ">
            <DeckStats deck={deck} />
          </div>
        )}
      </div>

      {showCardModal && (
        <CardModal
          handleCloseModal={handleCloseCardModal}
          selectedCard={selectedCard}
          addCard={addCard}
          deck={deckFiltered}
        />
      )}
    </div>
  );
}
