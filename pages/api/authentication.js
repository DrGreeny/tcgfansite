// pages/api/authentication.js

import nextConnect from "next-connect";
import mongoose from "mongoose";
import { verifySignature } from "../../utils/ethers";
import User from "../../models/user";

const handler = nextConnect();

handler.post(async (req, res) => {
  try {
    const { signature, publicAddress } = req.body;

    // Find the user based on the public address
    const user = await User.findOne({ publicAddress });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Verify the signature
    const isSignatureValid = verifySignature(
      user.nonce,
      signature,
      publicAddress
    );

    if (!isSignatureValid) {
      return res.status(401).json({ error: "Invalid signature" });
    }

    // Generate a JWT or session identifier for authentication
    const token = "your-generated-jwt-or-session-token";

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default handler;
