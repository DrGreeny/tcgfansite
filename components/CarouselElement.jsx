import React from "react";
import Link from "next/link";

const CarouselElement = ({ headline, summary, redirectTo }) => {
  return (
    <div className="flex justify-center ">
      <div className="w-full h-52 md:w-2/3 md:h-44 border-2 border-gray-400 rounded-xl p-4 flex flex-col justify-center items-center ">
        <h2 className="text-orange-700 text-2xl font-bold mb-2">{headline}</h2>
        <p className="text-sm text-gray-200">{summary}</p>
        <Link
          href={redirectTo}
          className="my-4 px-4 py-1 border border-orange-400 rounded-xl hover:bg-gradient-to-r hover:from-violet-800 hover:to-gray-800 transition duration-200"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default CarouselElement;
