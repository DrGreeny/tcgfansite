import { useEffect, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";

const GameSimulator = () => {
  const [deck, setDeck] = useState([]);
  const [playedCreatures, setPlayedCreatures] = useState([]);
  const [playedRealms, setPlayedRealms] = useState([]);
  const [playedEnchantments, setPlayedEnchantments] = useState([]);
  const [silence, setSilence] = useState([]);
  const [handCards, setHandCards] = useState([]);
  const [importedDeck, setImportedDeck] = useState(null);
  const [realmChosen, setRealmChosen] = useState(false);
  const [selectedRealm, setSelectedRealm] = useState(null);
  const [playerWords, setPlayerWords] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
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

        // Filter cards by type
        const heroCards = jsonData.filter((card) => card.Type === "Hero");
        const realmCards = jsonData.filter((card) => card.Type === "Realm");

        // Check conditions for importing
        if (heroCards.length !== 1 || realmCards.length < 1) {
          alert(
            "Invalid deck. Please ensure there is exactly one Hero card and at least one Realm card."
          );
          return;
        }

        // Create an array to store the imported cards
        const importedCards = [];

        // Iterate over the JSON data
        jsonData.forEach((item, index) => {
          const card = { ...item }; // Create a copy of the card object

          // Add index attribute to the card object
          card.index = index;

          // Check the count of the card
          if (card.count > 1) {
            // Add multiple elements to the importedCards array
            for (let i = 0; i < card.count; i++) {
              const copiedCard = { ...card };
              copiedCard.count = 1; // Set count to 1 for each element
              copiedCard.index = importedCards.length; // Set index based on importedCards length
              importedCards.push(copiedCard);
            }
          } else {
            // Add single card to the importedCards array
            card.count = 1; // Set count to 1
            importedCards.push(card);
          }
        });

        // Set the imported deck into state
        setImportedDeck(importedCards);
        setDeck(importedCards);
      } catch (error) {
        alert("Invalid JSON format. Please select a valid JSON file.");
      }
    };
    reader.readAsText(file);
  }
  const handleRealmSelection = (realmCard) => {
    const newRealm = { ...realmCard };
    newRealm.count = 1;

    // Move the selected realm card to the playedRealms array
    setPlayedRealms([newRealm]);

    const updatedDeck = deck.filter((card) => card.index !== realmCard.index);
    setDeck(updatedDeck);
    setRealmChosen(true);

    // Store the selected realm card
    setSelectedRealm(newRealm);

    // Move the Hero card to the playedCreatures array
    const heroCard = updatedDeck.find((card) => card.Type === "Hero");
    if (heroCard) {
      setPlayedCreatures([heroCard]);
      const updatedDeckAfterHero = updatedDeck.filter(
        (card) => card.index !== heroCard.index
      );
      setDeck(updatedDeckAfterHero);

      // Choose 5 random cards from the deck and move them to the handCards array
      const randomCards = [];
      const remainingDeck = [...updatedDeckAfterHero]; // Create a copy of the updated deck after removing the Hero card
      for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * remainingDeck.length);
        const randomCard = remainingDeck.splice(randomIndex, 1)[0];
        randomCards.push(randomCard);
      }
      setHandCards(randomCards);

      // Update the deck by removing the chosen cards
      const updatedDeckAfterDraw = updatedDeckAfterHero.filter(
        (card) =>
          !randomCards.some((randomCard) => randomCard.index === card.index)
      );
      setDeck(updatedDeckAfterDraw);

      // Set playerWords based on the selected realm
      if (newRealm.name !== "The First Tree") {
        setPlayerWords(10);
      } else {
        setPlayerWords(5);
      }
    }
  };

  const handleRealmClick = (realmCard) => {
    // Check if a realm card has already been selected
    if (selectedRealm) {
      return;
    }

    handleRealmSelection(realmCard);
  };

  function handleRestart() {
    setDeck([]);
    setImportedDeck(null);
    setPlayedCreatures([]);
    setPlayedRealms([]);
    setPlayedEnchantments([]);
    setSilence([]);
    setHandCards([]);
    setSelectedRealm(null);
    setRealmChosen(false);
    setPlayerWords(0);
  }
  function pullCard() {
    if (deck.length === 0) {
      alert("No cards left in the deck!");
      return;
    }

    const [firstCard, ...remainingDeck] = deck; // Destructure the first card from the deck

    // Move the first card to the handCards array
    setHandCards((prevHandCards) => [...prevHandCards, firstCard]);

    // Update the deck by removing the first card
    setDeck(remainingDeck);
  }

  const customStyle = {
    content: {
      "background-color": "black",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div className="min-h-screen text-gray-200">
      {!selectedRealm ? (
        <div className=" flex justify-center">
          <div>
            <h2 className="text-xl text-center mt-6">
              Load your deck (desktop only)
            </h2>
            <div className="text-xs mb-6 text-center">from json</div>
            <input
              type="file"
              accept=".json"
              onChange={handleImportJson}
              className="border border-orange-700 px-2 py-1 rounded-lg"
            />
          </div>
        </div>
      ) : (
        <div className="text-center">
          <button
            className="border rounded-lg px-2 py-1 border-orange-700 my-4"
            onClick={handleRestart}
          >
            Restart
          </button>
        </div>
      )}
      <div className="text-gray-200 w-full">
        {!realmChosen && importedDeck ? (
          <>
            <h2 className="font-bold text-2xl">Choose a Realm:</h2>
            <div className="text-white flex justify-start gap-3 w-full">
              {importedDeck.map((card, idx) => (
                <div key={idx} className="my-2" onClick={handleRealmClick}>
                  {card.Type === "Realm" ? (
                    <div
                      key={idx}
                      className="p-1 border rounded cursor-pointer flex-col w-28 h-28 text-white flex-shrink-0"
                      style={{
                        backgroundImage: `url(/Speak_Cards/${card.tokenId}.jpg)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}

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

                      <p className="w-full text-xs font-bold">{card.name}</p>
                      <p className="w-full text-[0.60rem] italic">
                        {card.Type}
                      </p>
                      {/* <p className="w-full text-[0.60rem]">{card.Description}</p> */}
                    </div>
                  ) : null}
                  {/* Render other card details */}
                </div>
              ))}
            </div>
          </>
        ) : (
          deck &&
          deck.length != 0 &&
          playedRealms &&
          !selectedRealm && (
            <div className="text-white">
              <div>
                <h2 className="font-bold text-2xl">Deck:</h2>
                {deck.map((card, idx) => (
                  <div key={idx}>
                    <h3>
                      {card.name} ({card.index})
                    </h3>
                    {/* Render other card details */}
                  </div>
                ))}
              </div>
              <div>
                <h2 className="font-bold text-2xl">Played Realms:</h2>
                {playedRealms.map((card) => (
                  <div key={card.tokenId}>
                    <h3>
                      {card.name}({card.index})
                    </h3>
                    {/* Render other card details */}
                  </div>
                ))}
              </div>
            </div>
          )
        )}
        {false && (
          <div className=" min-h-screen my-10">
            <h1 className="text-3xl text-center">Words: {playerWords}</h1>
            <div className="grid grid-cols-11 grid-rows-2 flex gap-y-6">
              <div className="bg-gray-900 w-32 h-56 rounded flex  m-auto col-span-2">
                <p className="m-auto">Realm 2</p>
              </div>
              <div className="bg-gray-900 w-32 h-56 rounded flex  m-auto">
                <p className="m-auto">Creature 1</p>
              </div>
              <div className="bg-gray-900 w-32 h-56 rounded flex  m-auto">
                <p className="m-auto">Creature 2</p>
              </div>
              <div className="bg-gray-900 w-32 h-56 rounded flex  m-auto">
                <p className="m-auto">Creature 3</p>
              </div>
              <div className=" row-span-2 flex  w-32 h-56 m-auto">
                <div className="m-auto">
                  {playedCreatures.length > 0 && (
                    <>
                      <h3>{playedCreatures[0].name}</h3>
                      <div className="relative w-32 h-32">
                        <Image
                          src={`/Speak_Cards/${playedCreatures[0].tokenId}.jpg`}
                          alt="Hero"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="bg-gray-900 w-32 h-56 rounded flex  m-auto">
                <p className="m-auto">Creature 4</p>
              </div>
              <div className="bg-gray-900 w-32 h-56 rounded flex  m-auto">
                <p className="m-auto">Creature 5</p>
              </div>
              <div className="bg-gray-900 w-32 h-56 rounded flex  m-auto">
                <p className="m-auto">Creature 6</p>
              </div>
              <div className="bg-gray-900 w-32 h-56 rounded flex  m-auto  col-span-2">
                <p className="m-auto">Silence</p>
              </div>
              <div className="bg-gray-900 w-32 h-56 rounded flex  m-auto  col-span-2">
                <p className="m-auto">Realm 1</p>
              </div>
              <div className="bg-gray-900 w-32 h-56 rounded flex  m-auto">
                <p className="m-auto">Enchantment 1</p>
              </div>
              <div className="bg-gray-900 w-32 h-56 rounded flex  m-auto">
                <p className="m-auto">Enchantment 2</p>
              </div>
              <div className="bg-gray-900 w-32 h-56 rounded flex  m-auto">
                <p className="m-auto">Enchantment 3</p>
              </div>
              <div className="bg-gray-900 w-32 h-56 rounded flex  m-auto">
                <p className="m-auto">Enchantment 4</p>
              </div>
              <div className="bg-gray-900 w-32 h-56 rounded flex  m-auto">
                <p className="m-auto">Enchantment 5</p>
              </div>
              <div className="bg-gray-900 w-32 h-56 rounded flex  m-auto">
                <p className="m-auto">Enchantment 6</p>
              </div>
              <div className="bg-gray-900 w-32 h-56 rounded flex  m-auto  col-span-2">
                <button
                  className=" border  border-orange-700 shadow-lg shadow-orange-700 w-full h-full m-auto "
                  onClick={pullCard}
                >
                  Draw a card
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {selectedRealm && (
        <>
          <h2 className="font-bold text-2xl text-center">Hand Cards:</h2>
          <div className="text-white flex w-full overflow-scroll justify-center gap-x-2 my-10">
            {handCards.map((card, idx) => (
              <div
                key={idx}
                className="p-1 border rounded cursor-pointer flex-col w-28 h-28 text-white flex-shrink-0"
                style={{
                  backgroundImage: `url(/Speak_Cards/${card.tokenId}.jpg)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}

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

                <p className="w-full text-xs font-bold">{card.name}</p>
                <p className="w-full text-[0.60rem] italic">{card.Type}</p>
                {/* <p className="w-full text-[0.60rem]">{card.Description}</p> */}
              </div>
            ))}
          </div>
          <div className="bg-gray-900 w-32 h-56 rounded flex  m-auto  col-span-2">
            <button
              className=" border  border-orange-700 shadow-lg shadow-orange-700 w-full h-full m-auto "
              onClick={pullCard}
            >
              Draw a card
            </button>
          </div>
        </>
      )}
      <Modal
        isOpen={selectedCard !== null}
        onRequestClose={() => setSelectedCard(null)}
        style={customStyle}
      >
        {selectedCard && (
          <div className="text-white flex justify-around">
            <div className="flex-col w-1/2 items-center text-sm border p-3">
              <div className="w-full flex justify-center">
                <div className="mb-1 mx-auto text-lg">{selectedCard.name}</div>
                <div className="text-lg">{selectedCard.WordCost}</div>
              </div>
              <div className="flex-col items-center">
                <div className="flex justify-center w-full h-52 ">
                  <Image
                    className="aboslute object-cover"
                    src={`/Speak_Cards/${selectedCard.tokenId}.jpg`}
                    alt={selectedCard.name}
                    width={208}
                    height={200}
                  />
                </div>
                <div className="flex justify-between">
                  <div className="italic my-2">
                    {selectedCard.Type}
                    {["Spell", "Curse"].includes(selectedCard.Type) && (
                      <span> / {selectedCard["Continuous/ Equip"]}</span>
                    )}
                  </div>
                  {(selectedCard.Type === "Creature" ||
                    selectedCard.Type === "Hero") && (
                    <div className="italic my-1">
                      DP {selectedCard.DP} / HP {selectedCard.HP}
                    </div>
                  )}
                </div>
                <div className="">
                  <p>{selectedCard.Description}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <button className="border px-2 py-1 rounded border-orange-700">
                Send to Silence
              </button>
              <button className="border px-2 py-1 rounded border-orange-700">
                Send to Deck
              </button>
              <button className="border px-2 py-1 rounded border-orange-700">
                Speak
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default GameSimulator;
