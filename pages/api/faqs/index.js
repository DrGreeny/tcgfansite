import mongodb from "../../../utils/mongodb";
import Faq from "../../../models/faq";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await handlePostRequest(req, res);
  } else if (req.method === "PUT") {
    await handlePutRequest(req, res);
  } else {
    await handleGetRequest(req, res);
  }
}
async function handlePutRequest(req, res) {
  try {
    await mongodb.dbConnect();
    const { summary, question, answer, author, tags } = req.body; // Extract the updated data from the request body
    console.log("ID: ", req.query.id);
    const faq = await Faq.findById(req.query.id); // Find the FAQ entry by ID
    console.log("FAQ: ", faq);
    if (!faq) {
      res.status(404).json({ message: "FAQ entry not found" });
      return;
    }

    // Update the FAQ entry with the new data
    faq.summary = summary;
    faq.question = question;
    faq.answer = answer;
    faq.author = author;
    faq.tags = tags;

    await faq.save(); // Save the updated entry to MongoDB

    const faqs = await Faq.find({}); // Fetch all FAQs after updating the entry

    res.status(200).json({
      message: "FAQ entry updated successfully",
      faqs: faqs, // Include the updated FAQs in the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await mongodb.dbDisconnect();
  }
}
async function handlePostRequest(req, res) {
  try {
    await mongodb.dbConnect();
    const { summary, question, answer, author, tags } = req.body; // Extract the data from the request body

    const faq = new Faq({
      summary,
      question,
      answer,
      author,
      tags,
    });

    await faq.save(); // Save the new entry to MongoDB

    const faqs = await Faq.find({}); // Fetch all FAQs after adding the new entry

    res.status(201).json({
      message: "FAQ entry created successfully",
      faqs: faqs, // Include the updated FAQs in the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await mongodb.dbDisconnect();
  }
}

async function handleGetRequest(req, res) {
  try {
    await mongodb.dbConnect();
    const faqs = await Faq.find({});
    res.status(200).json(faqs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await mongodb.dbDisconnect();
  }
}
