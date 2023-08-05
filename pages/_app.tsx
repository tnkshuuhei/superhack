import "@rainbow-me/rainbowkit/styles.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { StateContextProvider } from "@/context";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { WagmiConfig, configureChains, createClient } from "wagmi";
import {
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  rabbyWallet,
} from "@rainbow-me/rainbowkit/wallets";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  avalanche,
  bsc,
  goerli,
  optimismGoerli,
} from "wagmi/chains";

import { publicProvider } from "wagmi/providers/public";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

const { chains, provider } = configureChains(
  [
    /*
		mainnet,
    polygon,
    optimism,
    arbitrum,
    avalanche,
    bsc,
		*/
    goerli,
    optimismGoerli,
  ],
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
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} initialChain={mainnet}>
        <StateContextProvider>
          <Component {...pageProps} />;
        </StateContextProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
