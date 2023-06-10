import nextConnect from "next-connect";
import User from "../../../models/user";
import mongoose from "mongoose";

const handler = nextConnect();

handler.get(async (req, res) => {
  try {
    const users = await User.find({}, "-_id username publicAddress nonce");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

handler.post(async (req, res) => {
  try {
    const { username, publicAddress, nonce } = req.body;

    // Create a new user
    const user = new User({
      username,
      publicAddress,
      nonce,
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default handler;
