import { useRef, useEffect } from "react";
import Image from "next/image";
import { createCanvas } from "canvas";

export default function CardDetailedExplanation({ selectedCard }) {
  const hasValidExplanations =
    selectedCard.explanations &&
    selectedCard.explanations.length > 0 &&
    selectedCard.explanations.some((explanation) => explanation.trim() !== "");
  const imageRef = useRef(null);
  const shadowRef = useRef(null);
  let rotation = 0;

  useEffect(() => {
    const loadImage = async () => {
      const image = document.createElement("img");
      image.src = `/Speak_Cards/${selectedCard.tokenId}.jpg`;

      image.addEventListener("load", () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        const width = image.width;
        const height = image.height;

        canvas.width = width;
        canvas.height = height;

        context.drawImage(image, 0, 0, width, height);

        const imageData = context.getImageData(0, 0, width, height).data;

        let r = 0;
        let g = 0;
        let b = 0;

        for (let i = 0; i < imageData.length; i += 4) {
          r += imageData[i];
          g += imageData[i + 1];
          b += imageData[i + 2];
        }

        const pixelCount = imageData.length / 4;
        r = Math.floor(r / pixelCount);
        g = Math.floor(g / pixelCount);
        b = Math.floor(b / pixelCount);

        console.log(`Average Color: rgb(${r}, ${g}, ${b})`);

        const shadow = shadowRef.current;
        shadow.style.boxShadow = `10px 10px 10px rgba(${r}, ${g}, ${b}, 0.5)`;

        // Add this line to force a reflow
        shadow.offsetHeight;
      });
    };

    loadImage();
  }, [selectedCard.tokenId]);

  const handleMouseMove = (event) => {
    const clientX = event.clientX;
    const containerWidth = event.currentTarget.clientWidth;
    const mouseXPercent = (clientX / containerWidth) * 100;
    rotation = (mouseXPercent / (100 / 30) - 15).toFixed(2); // Rotation between -3 and 3 degrees around y-axis
    const image = imageRef.current;
    if (image) {
      image.style.transform = `rotateY(${rotation}deg)`;
    }
  };

  const getDominantColor = (pixelData) => {
    const colorCount = {};

    for (let i = 0; i < pixelData.length; i += 4) {
      const r = pixelData[i];
      const g = pixelData[i + 1];
      const b = pixelData[i + 2];

      const color = `${r},${g},${b}`;

      if (colorCount[color]) {
        colorCount[color] += 1;
      } else {
        colorCount[color] = 1;
      }
    }

    const maxCountColor = Object.keys(colorCount).reduce((a, b) =>
      colorCount[a] > colorCount[b] ? a : b
    );

    return maxCountColor.split(",").map((c) => parseInt(c, 10));
  };

  return (
    <div
      className="grid grid-cols-2 items-center justify-center content-center my-auto"
      onMouseMove={handleMouseMove}
    >
      <div ref={imageRef} className="w-96 h-96 m-auto duration-200">
        <div
          ref={shadowRef}
          className="relative mt-2 p-2 border-gray-300 rounded-md overflow-hidden w-96 h-96 m-auto"
        >
          <Image
            src={`/Speak_Cards/${selectedCard.tokenId}.jpg`}
            alt={selectedCard.name}
            fill
            className="object-fit"
          />
        </div>
      </div>

      <div className="ml-20">
        <div className="flex-col mb-3">
          <div className="text-4xl">{selectedCard.name}</div>
          <div className="flex gap-x-4 italic">
            <div>{selectedCard.Type}</div>
            <div>{selectedCard.Realm.map((realm) => realm).join(", ")}</div>
          </div>
          <div>
            {selectedCard.Type === "Curse" || selectedCard.Type === "Spell" ? (
              <>
                <span className="italic">
                  {selectedCard["Continuous/ Equip"]}
                </span>{" "}
                &nbsp;
              </>
            ) : null}
          </div>
          <div>
            <span className="italic">Word cost: </span>
            <span className="font-bold">{selectedCard.WordCost}</span>
          </div>
          <div>
            {selectedCard.Type === "Creature" ||
            selectedCard.Type === "Hero" ? (
              <>
                <span className="italic">DP: </span>
                <span className="font-bold">{selectedCard.DP}</span> &nbsp;
                <span className="italic">HP: </span>
                <span className="font-bold">{selectedCard.HP}</span>
              </>
            ) : null}
          </div>

          <div className="my-4 mr-5 border-t border-b py-4">
            {selectedCard.Description}
          </div>
        </div>
        {hasValidExplanations && (
          <>
            {selectedCard.explanations
              .filter((explanation) => explanation.trim() !== "")
              .map((explanation, index) => (
                <div
                  key={index}
                  className="shadow-lg p-2 mr-5 my-6 border border-orange-700 rounded whitespace-pre-line"
                >
                  <p className="m-auto">
                    {index + 1}: {explanation}
                  </p>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
}
