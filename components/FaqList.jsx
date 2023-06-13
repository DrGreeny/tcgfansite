/* import Faqs from "/db/faq"; // Import the FAQ component */
import Faq from "./Faq";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import axios from "axios";
import { AccountContext } from "./contexts/AccountContext";
import FaqInputForm from "./FaqInputForm"; // Import the InputForm component

const FAQList = () => {
  const { hasEditRights } = useContext(AccountContext); // Access hasEditRights from the AccountContext
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [faqs, setFaqs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling the modal
  const [editedFaq, setEditedFaq] = useState(null);

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
  const handleEditEntry = (faq) => {
    setEditedFaq(faq);
    setIsModalOpen(true);
  };
  // Filter FAQs based on search term
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );
  const fetchFaqs = async () => {
    try {
      const response = await axios.get("/api/faqs"); // Assuming you have an API route set up to fetch the FAQs
      setFaqs(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddEntry = () => {
    setIsModalOpen(true); // Open the modal when the button is clicked
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    fetchFaqs();
  };
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
      {hasEditRights && (
        <button
          className="mx-4 border border-orange-400 py-1 px-3 rounded-xl"
          onClick={handleAddEntry}
        >
          + Add Entry
        </button>
      )}
      <div className="flex justify-center">
        <input
          className="text-gray-900 my-4 py-1 px-2 rounded"
          type="text"
          placeholder="Search FAQs"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {filteredFaqs.map((faq, index) => {
        return (
          <div key={index} className="mb-10 ">
            {hasEditRights && (
              <div className="flex justify-end">
                <button
                  className=" border border-orange-400 py-1 px-3 rounded-xl"
                  onClick={() => handleEditEntry(faq)}
                >
                  Edit
                </button>
              </div>
            )}
            <Faq
              summary={faq.summary}
              question={faq.question}
              answer={faq.answer}
              date={faq.createdAt.substring(0, 10)}
              tags={faq.tags}
              author={faq.author}
            />
          </div>
        );
      })}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-75 flex items-center justify-center z-10">
          <div className="flex-col items-center flex bg-white p-4 rounded-lg w-11/12 max-w-4xl text-black">
            <div className="flex justify-end self-end">
              <button
                className="text-gray-500 focus:outline-none"
                onClick={closeModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <FaqInputForm faq={editedFaq} />
            {/* Render the InputForm component within the modal */}
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQList;
