export default function deckStats({ deck }) {
  const countByType = (type) => {
    return deck.reduce((count, card) => {
      if (card.Type && card.Type.toLowerCase() === type.toLowerCase()) {
        return count + card.count;
      }
      return count;
    }, 0);
  };
  // Helper function to calculate the total WordCost of a card type
  const calculateTotalWordCost = (type) => {
    return deck
      .filter((card) => card.Type === type)
      .reduce((total, card) => total + card.WordCost * card.count, 0);
  };
  const calculateTotalDp = (type) => {
    return deck
      .filter((card) => card.Type === type)
      .reduce((total, card) => total + card.DP * card.count, 0);
  };

  const calculateTotalHp = (type) => {
    return deck
      .filter((card) => card.Type === type)
      .reduce((total, card) => total + card.HP * card.count, 0);
  };

  // Calculate the WordCost for creature, spell, and curse types
  const creatureWordCost = calculateTotalWordCost("Creature");
  const spellWordCost = calculateTotalWordCost("Spell");
  const curseWordCost = calculateTotalWordCost("Curse");

  const totalHp = calculateTotalHp("Creature");
  const totalDp = calculateTotalDp("Creature");

  // Calculate the total WordCost for all selected cards
  const totalWordCost = deck.reduce((total, card) => total + card.WordCost, 0);

  function getCountByTypeAndAttribute(cards, type, attribute) {
    return cards
      .filter(
        (card) =>
          card["Type"] === type && card["Continuous/ Equip"] === attribute
      )
      .reduce((total, card) => total + card.count, 0);
  }
  const equipSpellsCount = getCountByTypeAndAttribute(deck, "Spell", "Equip");
  const equipCursesCount = getCountByTypeAndAttribute(deck, "Curse", "Equip");
  const singleSpellsCount = getCountByTypeAndAttribute(deck, "Spell", "Single");
  const singleCursesCount = getCountByTypeAndAttribute(deck, "Curse", "Single");
  const continuousSpellsCount = getCountByTypeAndAttribute(
    deck,
    "Spell",
    "Continuous"
  );
  const continuousCursesCount = getCountByTypeAndAttribute(
    deck,
    "Curse",
    "Continuous"
  );
  return (
    <div className="w-full  text-white">
      <div className="flex justify-center mb-4 font-bold">
        <h3 className="">Data and Statistics</h3>
      </div>

      <div className="flex w-full justify-around my-10">
        <div className="flex-col space-y-4">
          <div className="">
            {/*grid grid-cols-2 gap-x-2 */}
            <p>
              Overall Card Count:{" "}
              {deck.reduce((count, card) => count + card.count, 0)}
            </p>
            <p className="">Heros:{countByType("hero")}</p>
            <p>Creatures:{countByType("creature")}</p>
            <p>Curses:{countByType("curse")}</p>
            <p>Spells: {countByType("spell")}</p>
            <p>Realms: {countByType("realm")}</p>
          </div>
        </div>
        <div className="flex-col space-y-4">
          <div className="">
            {/*grid grid-cols-2 gap-x-2*/}
            <p className="">Creature total DP: {totalDp}</p>
            <p className="">Creature total HP: {totalHp}</p>
            <p className="">
              Average DP:{" "}
              {Math.round((totalDp / countByType("creature")) * 10) / 10}
            </p>
            <p className="">
              Average HP:{" "}
              {Math.round((totalHp / countByType("creature")) * 10) / 10}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-around my-2">
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
    </div>
  );
}
