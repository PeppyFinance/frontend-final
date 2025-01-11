import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {WagmiProvider} from "wagmi";
// import dynamic from "next/dynamic";
import {RainbowKitProvider, darkTheme} from "@rainbow-me/rainbowkit";
import {setUseWhatChange} from "@simbathesailor/use-what-changed";
import {BlockNumberProvider} from "@symmio/frontend-sdk/lib/hooks/useBlockNumber";
import store, {ReduxProvider} from "@symmio/frontend-sdk/state/declaration";
import Updaters from "@symmio/frontend-sdk/state/updaters";
import ErrorBoundary from "components/App/ErrorBoundaries";
import Layout from "components/Layout";
import {ModalBackground} from "components/Modal";
import Popups from "components/Popups";
import type {AppProps} from "next/app";
import {Toaster} from "react-hot-toast";
import {ModalProvider} from "styled-react-modal";
import ThemeProvider, {ThemedGlobalStyle} from "theme";
import {getWagmiConfig} from "utils/wagmi";
import ConfigSDKComponent from "./configSDK";

// const Updaters = dynamic(() => import("@symmio/frontend-sdk/state/updaters"), {
//   ssr: false,
// });

const {wagmiConfig, initialChain} = getWagmiConfig();
export default function MyApp({Component, pageProps}: AppProps) {
  if (process.env.NODE_ENV === "development") {
    setUseWhatChange(true);
  }
  const [showChild, setShowChild] = useState(false);
  const queryClient = new QueryClient();
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }
  if (typeof window === undefined) {
    return <></>;
  }
  return (
    <ErrorBoundary>
      <ReduxProvider store={store}>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider
              initialChain={initialChain}
              showRecentTransactions={true}
              theme={darkTheme({
                accentColor: "#AEE3FA",
                accentColorForeground: "#151A1F",
                borderRadius: "small",
                fontStack: "system",
                overlayBlur: "small",
              })}
            >
              <ThemeProvider>
                <ThemedGlobalStyle />
                <ModalProvider backgroundComponent={ModalBackground}>
                  <Toaster position="bottom-center" />
                  <BlockNumberProvider wagmiConfig={wagmiConfig}>
                    <Popups />
                    <Updaters />
                    <ConfigSDKComponent />
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </BlockNumberProvider>
                </ModalProvider>
              </ThemeProvider>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </ReduxProvider>
    </ErrorBoundary>
  );
}

export {wagmiConfig};
