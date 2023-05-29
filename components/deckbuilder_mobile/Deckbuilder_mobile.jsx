import React, { useState, useEffect } from "react";
import Fliter_mobile from "./Fliter_mobile";
import cards from "../../db/cards.json";
import CardModal from "./CardModal";
import SaveDeck from "../SaveDeck";

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

  useEffect(() => {
    const filteredDeck = deck.filter(
      (card) =>
        card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.Description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.Type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (card.Realm &&
          card.Realm.some((realm) =>
            realm.toLowerCase().includes(searchQuery.toLowerCase())
          )) ||
        (card["Continuous/ Equip"] &&
          card["Continuous/ Equip"]
            .toLowerCase()
            .includes(searchQuery.toLowerCase()))
    );
    setDeckFiltered(filteredDeck);
  }, [deck, searchQuery]);

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

  const handleSearchQuery = (query) => {
    setSearchQuery(query);

    const filteredCards = cards.filter(
      (card) =>
        card.name.toLowerCase().includes(query.toLowerCase()) ||
        card.Description.toLowerCase().includes(query.toLowerCase()) ||
        card.Type.toLowerCase().includes(query.toLowerCase()) ||
        (card.Realm &&
          card.Realm.some((realm) =>
            realm.toLowerCase().includes(query.toLowerCase())
          )) ||
        (card["Continuous/ Equip"] &&
          card["Continuous/ Equip"].toLowerCase().includes(query.toLowerCase()))
    );
    setCardsFiltered(filteredCards);

    const filteredDeck = deck.filter(
      (card) =>
        card.name.toLowerCase().includes(query.toLowerCase()) ||
        card.Description.toLowerCase().includes(query.toLowerCase()) ||
        card.Type.toLowerCase().includes(query.toLowerCase()) ||
        (card.Realm &&
          card.Realm.some((realm) =>
            realm.toLowerCase().includes(query.toLowerCase())
          )) ||
        (card["Continuous/ Equip"] &&
          card["Continuous/ Equip"].toLowerCase().includes(query.toLowerCase()))
    );
    setDeckFiltered(filteredDeck);
  };

  const handleInputChange = (e) => {
    handleSearchQuery(e.target.value);
  };

  const sections = [
    { headline: "Heroes", type: "Hero" },
    { headline: "Creatures", type: "Creature" },
    { headline: "Spells", type: "Spell" },
    { headline: "Curses", type: "Curse" },
    { headline: "Realms", type: "Realm" },
  ];

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
      </div>
      <div className=" ml-16" style={{ width: "calc(100% - 64px)" }}>
        <div className="flex justify-center   text-black">
          <button
            className="bg-white w-1/2 rounded-lg mt-1"
            onClick={handleFilterClick}
          >
            Filter
          </button>

          {/* Sliding Search Field */}
          {showSearchField && (
            <div className="fixed z-20 top-0 left-16 bg-white text-black flex items-center justify-center">
              <input
                className="px-2 py-1 pr-8"
                placeholder="Search cards..."
                value={searchQuery}
                onChange={handleInputChange}
              />
              {searchQuery && (
                <button
                  className="px-2 py-1 bg-gray-400 hover:bg-gray-300 "
                  onClick={() => {
                    setSearchQuery("");
                  }}
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
                <h2 className="text-lg font-bold text-white">
                  {section.headline}
                </h2>
                <div className="flex overflow-x-auto border-t border-b gap-x-4">
                  {cardsFiltered.map((card) => {
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
                  {deckFiltered.map((card) => {
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
                          /*    onContextMenu={(e) => {
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
        {activeButton === "Import" && <div>Import content goes here</div>}
        {activeButton === "Export" && (
          <div className="flex justify-center pt-10">
            <SaveDeck selectedCards={deck} />
          </div>
        )}
      </div>
      {showModal && <Fliter_mobile handleCloseModal={handleCloseModal} />}
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
