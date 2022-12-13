import type { AppProps } from "next/app";
import StartScreen from "@/components/StartScreen";

import "@/styles/global.css";
import { LoadingProvider } from "src/contexts/loadingContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LoadingProvider>
      <Component {...pageProps} />

      <StartScreen />
    </LoadingProvider>
  );
}
