import mongodb from "../../../utils/mongodb";
import Faq from "../../../models/faq";

export default async function handler(req, res) {
  await mongodb.dbConnect();
  try {
    const faqs = await Faq.find({});
    res.status(200).json(faqs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await mongodb.dbDisconnect();
  }
}
