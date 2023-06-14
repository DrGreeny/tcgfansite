import mongodb from "../../../utils/mongodb";
import User from "../../../models/user";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await handleGetRequest(req, res);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

async function handleGetRequest(req, res) {
  try {
    const { "x-ethereum-address": account } = req.headers;
    await mongodb.dbConnect();
    const user = await User.findOne({ publicAddress: account });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ nonce: user.nonce });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await mongodb.dbDisconnect();
  }
}
