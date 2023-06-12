import React, { useState, useContext, useEffect, useCallback } from "react";
import { AccountContext } from "./contexts/AccountContext";

const ConnectButton = () => {
  const {
    isConnected,
    account,
    setIsConnected,
    setAccount,
    selectedNetwork,
    setSelectedNetwork,
    hasEditRights,
    setHasEditRights,
  } = useContext(AccountContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setUserName("");
    setErrorMessage("");
  };
  const handleAccountsChanged = useCallback(
    (accounts) => {
      if (accounts.length === 0) {
        console.log("Disconnect called in MetaMask");
        setIsConnected(false);
        setAccount("");
        setSelectedNetwork("");
        setHasEditRights(false);
      } else {
        setAccount(accounts[0] || "");
      }
    },
    [setIsConnected, setAccount, setSelectedNetwork, setHasEditRights]
  );

  const handleDisconnect = useCallback(async () => {
    console.log("Disconnect called in Metamask");
    if (typeof window.ethereum?.disconnect === "function") {
      try {
        console.log("Disconnect called in Metamask 2");
        await window.ethereum.disconnect();
      } catch (error) {
        console.error("Error disconnecting from MetaMask:", error);
      }
    }
    setIsConnected(false);
    console.log("Disconnect called in Metamask 3");
    setAccount("");
    setSelectedNetwork("");
    setHasEditRights(false);
  }, [setIsConnected, setAccount, setSelectedNetwork, setHasEditRights]);

  useEffect(() => {
    const handleNetworkChanged = (networkId) => {
      setSelectedNetwork(networkId);
    };

    if (isConnected) {
      // Watch for account changes
      window.ethereum.on("accountsChanged", handleAccountsChanged);

      // Watch for network changes
      window.ethereum.on("networkChanged", handleNetworkChanged);
      // Watch for disconnection
      window.ethereum.on("disconnect", handleDisconnect);
      // Get initial account and network
      window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
        setAccount(accounts[0] || "");
      });
      window.ethereum.request({ method: "eth_chainId" }).then((networkId) => {
        setSelectedNetwork(networkId);
      });
    }

    // Clean up event listeners when component unmounts
    return () => {
      if (isConnected) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener("networkChanged", handleNetworkChanged);
        window.ethereum.removeListener("disconnect", handleDisconnect);
      }
    };
  }, [
    isConnected,
    setAccount,
    setSelectedNetwork,
    handleDisconnect,
    handleAccountsChanged,
  ]);
  useEffect(() => {
    // Fetch user attributes (e.g., editRights) from MongoDB based on the connected account
    const fetchUserAttributes = async () => {
      try {
        const response = await fetch("/api/users/getUserAttributes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ account }),
        });

        if (response.ok) {
          const data = await response.json();
          const { editRights } = data; // Assuming the response includes an "editRights" field
          setHasEditRights(editRights);
        } else {
          console.error("Error fetching user attributes");
          setHasEditRights(false);
        }
      } catch (error) {
        console.error("Error fetching user attributes:", error);
        setHasEditRights(false);
      }
    };

    if (isConnected && account) {
      fetchUserAttributes();
    }
  }, [isConnected, account, setHasEditRights]);
  const handleConnect = async () => {
    if (!isConnected) {
      // Check if MetaMask is installed
      if (typeof window.ethereum !== "undefined") {
        try {
          // Request account access

          await window.ethereum.request({ method: "eth_requestAccounts" });
          setIsConnected(true);
          console.log("Connect clicked");
        } catch (error) {
          console.error("Error connecting to MetaMask:", error);
        }
      } else {
        console.error("MetaMask is not installed.");
      }
    }
  };
  const handleRegisterUser = async () => {
    const enzi = "0xce4e4aDBC0834333BAAA04e523ed8411507b08f3";
    const greeny = "0x1037926A8f3d6F6c0C5A5A2Fd7ca964aAdC0eBDC";
    console.log(greeny.toLowerCase());
    if (account != enzi.toLowerCase() && account != greeny.toLowerCase()) {
      setErrorMessage("Error: User not allowed");
      return;
    }
    try {
      const response = await fetch("/api/users/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ account, userName }),
      });

      if (response.ok) {
        console.log("User registered successfully");
        closeModal();
      } else {
        const { error } = await response.json();
        console.error("Error registering user:", error);
        setErrorMessage("Error: User already exists"); // Set the error message
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setErrorMessage("Error: Failed to register user"); // Set the error message
    }
  };
  const shortenAddress = (address) => {
    if (address.length <= 8) {
      return address;
    }
    const start = address.slice(0, 4);
    const end = address.slice(-4);
    return `${start}...${end}`;
  };

  return (
    <div className="flex justify-center items-center my-2">
      {isConnected ? (
        <>
          <button
            className="rounded-lg border-orange-700 border -translate-y-2 mr-2 px-4 text-sm text-white"
            onClick={openModal}
          >
            Register
          </button>

          <div
            onClick={handleDisconnect}
            className="cursor-pointer rounded-lg border-orange-700 border -translate-y-2 mr-2 px-4 text-sm text-white"
          >
            <p>{shortenAddress(account)}</p>
          </div>
          {isModalOpen && (
            <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-75 flex items-center justify-center z-10">
              <div className="flex-col items-center flex bg-white p-4 rounded-lg w-11/12 max-w-md">
                <div className="flex justify-end self-end">
                  <button
                    className="text-gray-500 focus:outline-none"
                    onClick={closeModal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <h2 className="text-2xl text-center font-bold mb-4">
                  Register user address{" "}
                  <span className="text-base">{account}</span>
                </h2>
                <input
                  className="border py-1 px-2 rounded-lg border-orange-700"
                  type="text"
                  placeholder="Enter your user name"
                  maxLength={50}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <button
                  className="mt-8 border rounded-lg px-2 py-1 border-orange-700"
                  onClick={handleRegisterUser}
                >
                  Register
                </button>
                {errorMessage && (
                  <p className="text-red-500">{errorMessage}</p> // Render the error message
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <button
          className="rounded-lg border-orange-700 border -translate-y-2 mr-2 px-4 text-sm text-white"
          onClick={handleConnect}
        >
          Connect
        </button>
      )}
    </div>
  );
};

export default ConnectButton;
