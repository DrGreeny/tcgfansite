// pages/api/users.js

import nextConnect from "next-connect";
import mongoose from "mongoose";
import User from "../../models/user";

const handler = nextConnect();

handler.get(async (req, res) => {
  try {
    const { publicAddress } = req.query;

    // Find the user based on the public address
    const user = await User.findOne({ publicAddress });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ nonce: user.nonce });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default handler;
