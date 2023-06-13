import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AccountContext } from "./contexts/AccountContext";

const FaqInputForm = ({ faq }) => {
  const { account } = useContext(AccountContext); // Access hasEditRights from the AccountContext
  const [nonce, setNonce] = useState("");

  const [summary, setSummary] = useState(faq?.summary || "");
  const [question, setQuestion] = useState(faq?.question || "");
  const [answer, setAnswer] = useState(faq?.answer || "");
  const [author, setAuthor] = useState(faq?.author || "");
  const [tags, setTags] = useState(faq?.tags?.join(",") || "");
  const [signature, setSignature] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isEditMode = !!faq;

  useEffect(() => {
    const fetchNonce = async () => {
      try {
        const response = await axios.get("/api/users/nonce", {
          headers: { "x-ethereum-address": account }, // Replace with the actual Ethereum address
        });
        setNonce(response.data.nonce);
      } catch (error) {
        console.error("Error fetching nonce:", error);
      }
    };
    fetchNonce();
  }, [account]);

  const handleSummaryChange = (e) => {
    setSummary(e.target.value);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const handleSubmit = async (e) => {
    setErrorMessage("");
    setSuccessMessage("");
    e.preventDefault();

    const newFaq = {
      summary,
      question,
      answer,
      author,
      tags: tags.split(","),
    };

    if (isEditMode) {
      try {
        console.log("ID: ", faq._id);
        const faqResponse = await axios.put(`/api/faqs/${faq._id}`, newFaq);
        console.log("FAQ updated:", faqResponse.data);
        setSuccessMessage("FAQ updated successfully!");
        setSummary("");
        setQuestion("");
        setAnswer("");
        setAuthor("");
        setTags("");
      } catch (error) {
        setErrorMessage("Error updating FAQ, check your input data!");
        console.error("Error adding FAQ:", error);
      }
    } else {
      try {
        // Step 2: Make the API call with signature and publicAddress
        const response = await axios.post("/api/authentication", {
          signature,
          account,
        });
        console.log("Authentication successful:", response.data);

        const faqResponse = await axios.post("/api/faqs", newFaq);
        console.log("FAQ added:", faqResponse.data);
        setSuccessMessage("FAQ entry created successfully!");
        // Reset form fields
        setSummary("");
        setQuestion("");
        setAnswer("");
        setAuthor("");
        setTags("");
      } catch (error) {
        setErrorMessage("Error creating FAQ, check your input data!");
        console.error("Error adding FAQ:", error);
      }
    }
  };
  return (
    <div className="w-full">
      <div className="flex justify-center mb-4">
        <h2 className="font-bold text-xl">Add FAQ</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label className="font-bold">Author:</label>
          <input
            className="border border-lg px-2 py-1 w-full"
            type="text"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          <label className="font-bold">Summary:</label>
          <input
            className="border border-lg px-2 py-1 w-full"
            type="text"
            value={summary}
            onChange={handleSummaryChange}
          />
        </div>
        <div>
          <label className="font-bold">Question:</label>
          <textarea
            className="border border-lg px-2 py-1 w-full h-24"
            type="text"
            value={question}
            onChange={handleQuestionChange}
          />
        </div>
        <div>
          <label className="font-bold">Answer:</label>
          <textarea
            className="border border-lg px-2 py-1 w-full h-24"
            type="text"
            value={answer}
            onChange={handleAnswerChange}
          />
        </div>
        <div>
          <label className="font-bold">Tags (comma-separated):</label>
          <input
            className="border border-lg px-2 py-1 w-full"
            type="text"
            value={tags}
            onChange={handleTagsChange}
          />
        </div>
        <div className="flex flex-col items-center justify-center mt-6">
          {successMessage !== "" ? (
            <p className="text-green-500">{successMessage}</p> // Render the error message
          ) : (
            <button
              type="submit"
              className="border border-orange-700 px-2 py-1 rounded-lg"
            >
              {isEditMode ? "Update" : "Submit"}
            </button>
          )}

          {errorMessage && (
            <p className="text-red-500">{errorMessage}</p> // Render the error message
          )}
        </div>
      </form>
    </div>
  );
};

export default FaqInputForm;
