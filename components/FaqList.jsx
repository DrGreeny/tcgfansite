/* import Faqs from "/db/faq"; // Import the FAQ component */
import Faq from "./Faq";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

const FAQList = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get("/api/faqs"); // Assuming you have an API route set up to fetch the FAQs
        setFaqs(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFaqs();
  }, []);

  // Filter FAQs based on search term
  const filteredFaqs = faqs.filter(
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
      <Link
        className="border border-orange-400 py-1 px-3 rounded-xl"
        href="/faq"
      >
        &#60; Back
      </Link>

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
