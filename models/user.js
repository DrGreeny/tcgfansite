import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  publicAddress: { type: String, unique: true, required: true },
  nonce: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
