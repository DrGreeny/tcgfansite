import mongodb from "../../../utils/mongodb";
import User from "../../../models/user";
const generateNonce = () => {
  // Generate a random number or string to use as the nonce
  const nonce = Math.random().toString(36).substring(2);
  return nonce;
};

export default async function registerUser(req, res) {
  await mongodb.dbConnect();
  const { account, userName } = req.body;

  // Check if user already exists by address or username
  const existingUser = await User.findOne({
    $or: [{ publicAddress: account }, { username: userName }],
  });

  if (existingUser) {
    // User with the same address or username already exists
    console.warn("User already exists");
    res.status(400).json({ error: "User already exists" });
    return;
  }

  // Generate an initial nonce
  const nonce = generateNonce();

  // Create a new user
  const newUser = new User({
    username: userName,
    publicAddress: account,
    nonce,
    editRight: false,
  });

  try {
    // Save the user to the database
    await newUser.save();
    console.log("User registered successfully");
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Error registering user" });
  }
}

// ...
