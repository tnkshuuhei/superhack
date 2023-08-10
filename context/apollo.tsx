import React, { createContext, useContext, ReactNode } from "react";
import {
  ApolloClient,
  ApolloProvider as OriginalApolloProvider,
  InMemoryCache,
} from "@apollo/client";

const sepoliaClient = new ApolloClient({
  uri: "https://sepolia.easscan.org/graphql",
  cache: new InMemoryCache(),
});

const optimismGoerliClient = new ApolloClient({
  uri: "https://optimism-goerli-bedrock.easscan.org/graphql",
  cache: new InMemoryCache(),
});
// Base Goerli Client
const baseGoerliClient = new ApolloClient({
  uri: "https://base-goerli.easscan.org/graphql",
  cache: new InMemoryCache(),
});

// Optimism Client
const optimismClient = new ApolloClient({
  uri: "https://optimism.easscan.org/graphql",
  cache: new InMemoryCache(),
});

interface IApolloContext {
  getClients: (chainId: number) => ApolloClient<any>;
}
interface ApolloProviderProps {
  children: ReactNode;
  currentChainId: number;
}

const ApolloContext = createContext<IApolloContext | undefined>(undefined);

export const ApolloProvider: React.FC<ApolloProviderProps> = ({
  children,
  currentChainId,
}) => {
  const getClients = (chainId: number): ApolloClient<any> => {
    // ここでチェーンIDに基づいて適切な Apollo Client を選択します
    switch (chainId) {
      case 11155111:
        return sepoliaClient;
      case 420:
        return optimismGoerliClient;
      case 84531:
        return baseGoerliClient;
      case 10:
        return optimismClient;
      default:
        throw new Error("Unknown chain ID");
    }
  };

  return (
    <ApolloContext.Provider value={{ getClients }}>
      <OriginalApolloProvider client={getClients(currentChainId)}>
        {children}
      </OriginalApolloProvider>
    </ApolloContext.Provider>
  );
};

export const useApollo = () => {
  const context = useContext(ApolloContext);
  if (!context) {
    throw new Error("useApollo must be used within an ApolloProvider");
  }
  return context;
};
