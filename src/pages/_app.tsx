import type { AppProps } from "next/app";
import StartScreen from "@/components/StartScreen";

import "@/styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />

      <StartScreen />
    </>
  );
}
