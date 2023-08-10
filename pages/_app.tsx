import "@rainbow-me/rainbowkit/styles.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { StateContextProvider, useStateContext } from "@/context";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import {
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  rabbyWallet,
} from "@rainbow-me/rainbowkit/wallets";
import {
  sepolia,
  optimismGoerli,
  optimism,
  baseGoerli,
  base,
  zora,
} from "wagmi/chains";
import { SessionProvider } from "next-auth/react";
import { publicProvider } from "wagmi/providers/public";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { ApolloProvider } from "@/context/apollo";

const { chains, publicClient } = configureChains(
  [sepolia, optimismGoerli, baseGoerli, optimism /*, base, zora*/],
  [publicProvider()]
);

const projectId: string = process.env.NEXT_PUBLIC_PROJECT_ID || "";
const appName: string = "My Rainbow Template App";

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ chains }),
      rainbowWallet({ chains, projectId }),
      metaMaskWallet({ chains, projectId }),
      rabbyWallet({ chains }),
      coinbaseWallet({ chains, appName }),
      walletConnectWallet({ chains, projectId }),
    ],
  },
]);
const wagmiClient = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
function ComponentWithApolloProvider({ Component, ...props }) {
  const { currentChainId } = useStateContext();

  return (
    <ApolloProvider currentChainId={currentChainId}>
      <Component {...props} />
    </ApolloProvider>
  );
}
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <WagmiConfig config={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          initialChain={sepolia}
          modalSize="compact"
        >
          <StateContextProvider>
            <ComponentWithApolloProvider {...pageProps} Component={Component} />
          </StateContextProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </SessionProvider>
  );
}
