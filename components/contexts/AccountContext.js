import React, { createContext, useState } from "react";

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [hasEditRights, setHasEditRights] = useState(false);

  const contextValue = {
    isConnected,
    account,
    setIsConnected,
    setAccount,
    selectedNetwork,
    setSelectedNetwork,
    hasEditRights,
    setHasEditRights,
  };

  return (
    <AccountContext.Provider value={contextValue}>
      {children}
    </AccountContext.Provider>
  );
};
