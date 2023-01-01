import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";

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
      <Component {...pageProps} />

      <AnimatePresence>{show && <StartScreen />}</AnimatePresence>
    </LoadingProvider>
  );
}
