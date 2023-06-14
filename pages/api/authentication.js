import mongodb from "../../utils/mongodb";
import User from "../../models/user";
import { ethers } from "ethers";

const generateNonce = () => {
  // Generate a random number or string to use as the nonce
  const nonce = Math.random().toString(36).substring(2);
  return nonce;
};

const verifyMessage = async ({ message, address, signature }) => {
  try {
    console.log("message: ", message);
    console.log("signature: ", signature);
    const signerAddr = ethers.utils.verifyMessage(message, signature);
    console.log("Signkannser Address: ", signerAddr);
    if (signerAddr.toLowerCase() !== address) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default async function handler(req, res) {
  try {
    await mongodb.dbConnect();

    // Destructure the sig and account values from the parsed body
    const { signature, account } = req.body;
    console.log("Authentication called");
    console.log("Address: ", account);
    console.log("Signature:", signature);
    // Find the user with the provided public address
    const user = await User.findOne({ publicAddress: account });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      console.log("User not found");
      return;
    }

    const nonce = user.nonce;

    const isSignatureValid = await verifyMessage({
      message: nonce,
      address: account,
      signature,
    });

    if (isSignatureValid) {
      // Generate a new nonce for the user
      const newNonce = generateNonce();

      // Update the user's nonce in MongoDB
      await User.findByIdAndUpdate(user._id, { nonce: newNonce });

      console.log("Signature is valid");
      res.status(200).json({ message: "Authentication successful" });
    } else {
      console.log("Signature is invalid");
      res.status(401).json({ error: "Authentication failed" });
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await mongodb.dbDisconnect();
  }
}
