import Faqs from "/db/faq"; // Import the FAQ component
import Faq from "./Faq";
import { useState } from "react";
import Link from "next/link";
const FAQList = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  // Filter FAQs based on search term
  const filteredFaqs = Faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="text-white p-6">
      <button className="border border-orange-700 py-1 px-3 rounded-xl">
        <Link href="/faq">&#60; Back</Link>
      </button>
      <div className="flex justify-center">
        <input
          className="text-gray-900 my-4 py-1 px-2 rounded"
          type="text"
          placeholder="Search FAQs"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {filteredFaqs.map((faq, index) => (
        <div key={index} className="mb-10">
          <Faq
            summary={faq.summary}
            question={faq.question}
            answer={faq.answer}
            date={faq.date}
            tags={faq.tags}
            author={faq.author}
          />
        </div>
      ))}
    </div>
  );
};

export default FAQList;
