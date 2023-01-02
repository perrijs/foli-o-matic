import { useEffect, useState } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";

import StartScreen from "@/components/StartScreen";
import { LoadingProvider } from "src/contexts/loadingContext";

import {
  GL_START_VENDING_MACHINE,
  GL_ZOOM_VENDING_MACHINE,
} from "@/webgl/config/topics";

import "@/styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  const [show, setShow] = useState<boolean>(true);

  useEffect(() => {
    PubSub.subscribe(GL_START_VENDING_MACHINE, () => {
      setShow(false);

      PubSub.publish(GL_ZOOM_VENDING_MACHINE);
    });
  }, []);

  return (
    <LoadingProvider>
      <Head>
        <link rel="shortcut icon" href="/images/meta/favicon.png" />

        <meta property="og:url" content="https://perrijs.io" />
        <meta property="og:image" content="/images/meta/share_image.jpg" />

        <meta name="twitter:image" content="/images/meta/share_image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Component {...pageProps} />

      <AnimatePresence>{show && <StartScreen />}</AnimatePresence>
    </LoadingProvider>
  );
}
