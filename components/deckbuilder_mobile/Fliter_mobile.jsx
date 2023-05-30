import React, { useEffect } from "react";
import Range from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";
import cards from "../../db/cards.json";
export default function Fliter_mobile({
  deck,
  setCardsFiltered,
  setDeckFiltered,
  searchQuery,
}) {
  const [selectedRealms, setSelectedRealms] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedEnchantment, setSelectedEnchantment] = useState([]);
  const [filterSelectedCards, setFilterSelectedCards] = useState(false);
  const [wordCostRange, setWordCostRange] = useState([0, 10]);
  const [dpRange, setDPRange] = useState([0, 20]);
  const [hpRange, setHPRange] = useState([0, 100]);

  const handleRealmSelect = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value.toLowerCase()
    );

    setSelectedRealms(selectedOptions);
  };

  useEffect(() => {
    const activateCardsFilter = () => {
      setCardsFiltered(
        cards
          .filter((card) => {
            const name = card.name.toLowerCase();
            const type = card.Type ? card.Type.toLowerCase() : "";
            const enchantment = card["Continuous/ Equip"]
              ? card["Continuous/ Equip"].toLowerCase()
              : "";
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

            if (
              selectedEnchantment.length > 0 &&
              !selectedEnchantment.includes(enchantment.toLowerCase())
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
              card.WordCost >= wordCostRange[0] &&
              card.WordCost <= wordCostRange[1] &&
              card.DP >= dpRange[0] &&
              card.DP <= dpRange[1] &&
              card.HP >= hpRange[0] &&
              card.HP <= hpRange[1]
          )
      );
    };
    const activateDeckFilter = () => {
      setDeckFiltered(
        deck
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

            if (
              filterSelectedCards &&
              selectedEnchantment.length > 0 &&
              !selectedEnchantment.includes(enchantment.toLowerCase())
            ) {
              return false;
            }

            if (filterSelectedCards) {
              return (
                name.includes(searchQuery.toLowerCase()) ||
                type.includes(searchQuery.toLowerCase())
              );
            } else {
              return true; // No filter applied on searchQuery if filterSelectedCards is false
            }
          })
          .filter((card) => {
            if (filterSelectedCards) {
              return (
                card.WordCost >= wordCostRange[0] &&
                card.WordCost <= wordCostRange[1] &&
                card.DP >= dpRange[0] &&
                card.DP <= dpRange[1] &&
                card.HP >= hpRange[0] &&
                card.HP <= hpRange[1]
              );
            } else {
              return true; // No filter applied if filterSelectedCards is false
            }
          })
      );
    };
    activateCardsFilter();
    activateDeckFilter;
  }, [
    selectedRealms,
    selectedTypes,
    selectedEnchantment,
    filterSelectedCards,
    wordCostRange,
    dpRange,
    hpRange,
    setDeckFiltered,
    setCardsFiltered,
    searchQuery,
    deck,
  ]);
  const handleTypeSelect = (event) => {
    const type = event.target.name.toLowerCase();
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedTypes([...selectedTypes, type]);
    } else {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    }
  };

  const handleEnchantmentSelect = (event) => {
    const enchantment = event.target.name.toLowerCase();
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedEnchantment([...selectedEnchantment, enchantment]);
    } else {
      setSelectedEnchantment(
        selectedEnchantment.filter((t) => t !== enchantment)
      );
    }
  };
  const handleSliderChange = (values) => {
    setWordCostRange(values);
  };
  // Event handler for DP slider
  const handleDPSliderChange = (value) => {
    setDPRange(value);
  };

  // Event handler for HP slider
  const handleHPSliderChange = (value) => {
    setHPRange(value);
  };

  return (
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
              <option value="Digital">Digital</option>
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
          <div className="">
            <label className="block">Filter Affix:</label>
            <label className="block">
              <input
                type="checkbox"
                name="continuous"
                checked={selectedEnchantment.includes("continuous")}
                onChange={handleEnchantmentSelect}
              />
              Continuous
            </label>
            <label className="block">
              <input
                type="checkbox"
                name="equip"
                checked={selectedEnchantment.includes("equip")}
                onChange={handleEnchantmentSelect}
              />
              Equip
            </label>
            <label className="block">
              <input
                type="checkbox"
                name="single"
                checked={selectedEnchantment.includes("single")}
                onChange={handleEnchantmentSelect}
              />
              Single
            </label>
          </div>
          <div className=" flex-col">
            <div>
              <p>
                DP Range: {dpRange[0]} - {dpRange[1]}
              </p>

              <Range
                range
                min={0}
                max={20}
                value={dpRange}
                onChange={handleDPSliderChange}
                className="text-black"
              />
            </div>

            <div>
              <p>
                HP Range: {hpRange[0]} - {hpRange[1]}
              </p>

              <Range
                range
                min={0}
                max={100}
                value={hpRange}
                onChange={handleHPSliderChange}
                className="text-black"
              />
            </div>
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
                className="text-black"
              />
            </div>
          </div>
          <div>
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
    </div>
  );
}
