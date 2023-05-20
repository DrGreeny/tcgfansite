import React from "react";
import Link from "next/link";

const CarouselElement = ({ headline, summary, redirectTo }) => {
  return (
    <div className="flex justify-center">
      <div className="w-1/2 h-72 border rounded-xl p-4 flex flex-col justify-center items-center">
        <h2 className="text-xl font-bold mb-2">{headline}</h2>
        <p className="text-sm text-gray-200">{summary}</p>
        <Link
          href={redirectTo}
          className="mt-4 px-4 py-1 border border-orange-400 rounded-xl bg-gradient-to-r from-orange-500 to-gray-500 hover:from-violet-800 hover:to-gray-800 transition duration-200"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default CarouselElement;
