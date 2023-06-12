import mongodb from "../../../utils/mongodb";
import User from "../../../models/user";

export default async function handler(req, res) {
  await mongodb.dbConnect();
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { account } = req.body;

  try {
    const user = await User.findOne({ publicAddress: account });

    if (user) {
      const { editRight } = user;
      res.status(200).json({ editRights: editRight });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user attributes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
