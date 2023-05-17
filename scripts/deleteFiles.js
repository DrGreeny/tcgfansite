const fs = require("fs");
const path = require("path");

const folderPath = "F:/Projekte/tcgfansite/Speak_Cards"; // Replace with the actual folder path

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error("Error reading folder:", err);
    return;
  }

  files.forEach((file) => {
    if (file.endsWith(".jpg") && file.includes("(1)")) {
      const filePath = path.join(folderPath, file);

      fs.unlink(filePath, (error) => {
        if (error) {
          console.error("Error deleting file:", error);
          return;
        }
        console.log(`Deleted file: ${filePath}`);
      });
    }
  });
});
