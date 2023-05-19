const Faq = ({ summary, question, answer, date, tags, author }) => {
  return (
    <div className=" p-2 mx-2">
      <div className="flex gap-4 mb-2 shadow-md shadow-gray-200 p-2">
        <h2 className="font-bold text-lg mr-4">{summary}</h2>
        <p>
          <span className="font-bold text-gray-200">Date: </span> {date}
        </p>
        <p>
          <span className="font-bold text-gray-200">Author: </span> {author}
        </p>
        <ul className="flex gap-x-2 text-gray-200">
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

      <h2 className="whitespace-pre-line mb-2">
        <span className="font-bold">
          Question <br />
        </span>
        {question}
      </h2>
      <p className="whitespace-pre-line mb-4">
        <span className="font-bold">
          Answer
          <br />
        </span>
        {answer}
      </p>
    </div>
  );
};

export default Faq;
