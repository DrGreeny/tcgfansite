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
  filterSettings,
  setFilterSettings,
  setIsFilterApplied,
}) {
  // Initialize filter state variables with the values from filterSettings
  const [selectedRealms, setSelectedRealms] = useState(
    filterSettings.selectedRealms
  );
  const [selectedTypes, setSelectedTypes] = useState(
    filterSettings.selectedTypes
  );
  const [selectedEnchantment, setSelectedEnchantment] = useState(
    filterSettings.selectedEnchantment
  );
  const [filterSelectedCards, setFilterSelectedCards] = useState(
    filterSettings.filterSelectedCards
  );
  const [wordCostRange, setWordCostRange] = useState(
    filterSettings.wordCostRange
  );
  const [dpRange, setDPRange] = useState(filterSettings.dpRange);
  const [hpRange, setHPRange] = useState(filterSettings.hpRange);

  const handleRealmSelect = (event) => {
    const realm = event.target.value.toLowerCase();
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedRealms([...selectedRealms, realm]);
    } else {
      setSelectedRealms(selectedRealms.filter((r) => r !== realm));
    }
  };

  useEffect(() => {
    const defaultFilterSettings = {
      selectedRealms: [],
      selectedTypes: [],
      selectedEnchantment: [],
      filterSelectedCards: false,
      wordCostRange: [0, 10],
      dpRange: [0, 20],
      hpRange: [0, 100],
    };
    setIsFilterApplied(
      JSON.stringify(filterSettings) !== JSON.stringify(defaultFilterSettings)
    );

    setFilterSettings({
      selectedRealms,
      selectedTypes,
      selectedEnchantment,
      filterSelectedCards,
      wordCostRange,
      dpRange,
      hpRange,
    });

    // ...
  }, [
    selectedRealms,
    selectedTypes,
    selectedEnchantment,
    filterSelectedCards,
    wordCostRange,
    dpRange,
    hpRange,
    setFilterSettings,
    setIsFilterApplied,
    filterSettings,
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

  const handleResetFilters = () => {
    const defaultFilterSettings = {
      selectedRealms: [],
      selectedTypes: [],
      selectedEnchantment: [],
      filterSelectedCards: false,
      wordCostRange: [0, 10],
      dpRange: [0, 20],
      hpRange: [0, 100],
    };

    setSelectedRealms(defaultFilterSettings.selectedRealms);
    setSelectedTypes(defaultFilterSettings.selectedTypes);
    setSelectedEnchantment(defaultFilterSettings.selectedEnchantment);
    setFilterSelectedCards(defaultFilterSettings.filterSelectedCards);
    setWordCostRange(defaultFilterSettings.wordCostRange);
    setDPRange(defaultFilterSettings.dpRange);
    setHPRange(defaultFilterSettings.hpRange);
    setFilterSettings(defaultFilterSettings);
  };
  const realmOptions = [
    "Angelic",
    "Mythic",
    "Human",
    "Demonic",
    "Undead",
    "Dragon",
    "Beast",
    "Cosmic",
    "Digital",
  ];
  return (
    <div className="w-full p-4">
      <div className="flex justify-center p-2">
        <h3 className="font-bold">Filter Options</h3>
      </div>

      <div className=" text-white p-2">
        <div className="flex-col justify-around">
          <div className="flex justify-around">
            <div className="">
              <label className="block">Filter by Realm:</label>
              <div className="flex-col flex-wrap gap-x-2">
                {realmOptions.map((realm) => (
                  <label className="block" key={realm}>
                    <input
                      type="checkbox"
                      value={realm}
                      checked={selectedRealms.includes(realm.toLowerCase())}
                      onChange={handleRealmSelect}
                    />
                    {realm}
                  </label>
                ))}
              </div>
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
          </div>

          <div className=" flex justify-center gap-x-4 my-4">
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
          <div className="flex-col space-y-3">
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
            <div
              className="flex
             h-full justify-center mt-2"
            >
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
          <div className="flex justify-center">
            <button
              className="my-4 p-2 bg-gray-600"
              onClick={handleResetFilters}
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
