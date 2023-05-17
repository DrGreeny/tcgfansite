const SaveDeck = ({ selectedCards }) => {
  const handleSave = () => {
    const json = JSON.stringify(selectedCards, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "deck.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSave}
      >
        Save Deck
      </button>
    </div>
  );
};

export default SaveDeck;
