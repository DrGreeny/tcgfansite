import { useState } from "react";

useState;
const Faq = ({ summary, question, answer, date, tags, author }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  return (
    <div className=" p-2 mx-2">
      <div className="flex gap-4 mb-2 shadow-md shadow-gray-200 p-2">
        <h2 className="font-bold text-lg mr-4 w-1/2">{summary}</h2>
        <p>
          <span className="font-bold text-gray-200">Date: </span> {date}
        </p>
        <p>
          <span className="font-bold text-gray-200">Author: </span> {author}
        </p>
        <ul className="flex-col gap-x-2 text-gray-200">
          {tags.map((tag, index) => (
            <li
              key={index}
              className="border  px-2 rounded-lg shadow-md shadow-gray-300"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
      {expanded && (
        <>
          <h2 className="whitespace-pre-line mb-2">
            <span className="font-bold">
              Question <br />
            </span>
            {question}
          </h2>

          <h2 className="whitespace-pre-line mb-4">
            <span className="font-bold">Answer</span>
            <br />
            {answer}
          </h2>
        </>
      )}
      <button className="text-gray-200 " onClick={toggleExpand}>
        {expanded ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 inline-block mr-1 transform rotate-180"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 inline-block mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {expanded ? "Collapse" : "Expand"}
      </button>
    </div>
  );
};

export default Faq;
