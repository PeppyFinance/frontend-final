import React, { useEffect, useState } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import store, {
  ReduxProvider,
  persistor,
} from "@symmio/frontend-sdk/state/declaration";
import { PersistGate } from "redux-persist/integration/react";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { getWagmiConfig } from "utils/wagmi";
import ThemeProvider, { ThemedGlobalStyle } from "theme";
import { ModalProvider } from "styled-react-modal";
import { Toaster } from "react-hot-toast";
import { ModalBackground } from "components/Modal";
import Layout from "components/Layout";
import Popups from "components/Popups";
import { BlockNumberProvider } from "@symmio/frontend-sdk/lib/hooks/useBlockNumber";
import ConfigSDKComponent from "./configSDK";
import { setUseWhatChange } from "@simbathesailor/use-what-changed";
import Updaters from "@symmio/frontend-sdk/state/updaters";
import ErrorBoundary from "components/App/ErrorBoundaries";

const { wagmiConfig, initialChain } = getWagmiConfig();
export default function MyApp({ Component, pageProps }: AppProps) {
  if (process.env.NODE_ENV === "development") {
    setUseWhatChange(true);
  }
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === undefined) {
    return <></>;
  }

  const queryClient = new QueryClient({});

  return (
    <ErrorBoundary>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
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
        </PersistGate>
      </ReduxProvider>
    </ErrorBoundary>
  );
}

export { wagmiConfig };
