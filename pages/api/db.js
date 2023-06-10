// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongodb from "../../utils/mongodb";
import jsondb from "../../db/faq";
import Faq from "../../models/initFaq";

export default async function handler(req, res) {
  await mongodb.dbConnect();
  await Faq.deleteMany(); //alle existierenden Faqe aus der COllection entfernen
  await Faq.insertMany(jsondb);
  const Faqs = await Faq.find({});
  await mongodb.dbDisconnect();
  res.send(Faqs);
}
