function ImportModal({ onImport, onCancel }) {
  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const importedData = JSON.parse(reader.result);
        onImport(importedData);
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Import Cards</h3>
        <p>Do you want to import the selected cards?</p>
        <div>
          <input type="file" accept=".json" onChange={handleFileChange} />
        </div>
        <div>
          <button onClick={onImport}>Yes</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
