import React from "react";

export default function Fliter_mobile({ handleCloseModal }) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-75 flex justify-center items-center text-black">
      <div className="bg-white p-4 ">
        <button
          className="absolute top-0 right-0 p-2 text-white"
          onClick={handleCloseModal}
        >
          X
        </button>
        <h1 className="text-2xl font-bold text-black">Filter Options</h1>
        <p>Coming soon...</p>
      </div>
    </div>
  );
}
