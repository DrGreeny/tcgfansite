const SaveDeck = ({ selectedCards }) => {
  const handleSave = () => {
    const json = JSON.stringify(selectedCards, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "deck.json";

    // Trigger the "Save As" dialog
    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );

    URL.revokeObjectURL(url);
  };

  return (
    <div className="">
      <button
        className="bg-black text-white px-4 rounded h-6 border-orange-700 border"
        onClick={handleSave}
      >
        Export Json
      </button>
    </div>
  );
};

export default SaveDeck;
