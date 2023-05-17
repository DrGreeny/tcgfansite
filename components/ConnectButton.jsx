import React, { useState, useEffect } from "react";

const ConnectButton = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("");

  useEffect(() => {
    const initializeMetamask = async () => {
      // Check if MetaMask is installed
      if (typeof window.ethereum !== "undefined") {
        try {
          // Request account access
          await window.ethereum.request({ method: "eth_requestAccounts" });
          setIsConnected(true);
        } catch (error) {
          console.error("Error connecting to MetaMask:", error);
        }
      } else {
        console.error("MetaMask is not installed.");
      }
    };

    initializeMetamask();
  }, []);

  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      setSelectedAccount(accounts[0] || "");
    };

    const handleNetworkChanged = (networkId) => {
      setSelectedNetwork(networkId);
    };

    if (isConnected) {
      // Watch for account changes
      window.ethereum.on("accountsChanged", handleAccountsChanged);

      // Watch for network changes
      window.ethereum.on("networkChanged", handleNetworkChanged);

      // Get initial account and network
      window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
        setSelectedAccount(accounts[0] || "");
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
      }
    };
  }, [isConnected]);

  const handleConnect = async () => {
    if (!isConnected) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
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
    <div>
      {isConnected ? (
        <div className="text-white">
          <p>Connected Account: {shortenAddress(selectedAccount)}</p>
          <p>Selected Network: {selectedNetwork}</p>
        </div>
      ) : (
        <button onClick={handleConnect}>Connect with Metamask</button>
      )}
    </div>
  );
};

export default ConnectButton;
