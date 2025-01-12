import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { setUseWhatChange } from "@simbathesailor/use-what-changed";
import { BlockNumberProvider } from "@symmio/frontend-sdk/lib/hooks/useBlockNumber";
import store, {
  ReduxProvider,
  persistor,
} from "@symmio/frontend-sdk/state/declaration";
import Updaters from "@symmio/frontend-sdk/state/updaters";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "components/App/ErrorBoundaries";
import Layout from "components/Layout";
import { ModalBackground } from "components/Modal";
import Popups from "components/Popups";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";
import { ModalProvider } from "styled-react-modal";
import ThemeProvider, { ThemedGlobalStyle } from "theme";
import { getWagmiConfig } from "utils/wagmi";
import { WagmiProvider } from "wagmi";
import ConfigSDKComponent from "./configSDK";

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
