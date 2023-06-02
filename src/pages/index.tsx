import Head from "next/head";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { useLoading } from "@/contexts/loadingContext";

import { Load } from "@/webgl/load";
import WebGL from "@/webgl/index";

import TriggerElement from "@/components/TriggerElement";
import MenuButton from "@/components/MenuButton";
import StartScreen from "@/components/StartScreen";

import { TRIGGER_ELEMENTS } from "@/webgl/config/scrollTriggers";
import FocusButton from "@/components/FocusButton";
import {
  GL_ACTIVATE_FOCUS,
  UI_NEXT_ITEM,
  UI_PREV_ITEM,
} from "@/webgl/config/topics";

const Index = () => {
  const { loaded } = useLoading();

  const [isStarted, setIsStarted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubscriptions = () => {
    PubSub.subscribe(GL_ACTIVATE_FOCUS, () => setIsFocused(true));
  };

  useEffect(() => {
    if (loaded) return;

    handleSubscriptions();
    new Load();
  }, [loaded]);

  return (
    <>
      <Head>
        <title>FOLI-O-MATIC | Perri Schofield</title>

        <meta property="og:title" content="FOLI-O-MATIC | Perri Schofield" />
        <meta
          name="description"
          content="Bite-sized projects for the busy creative on the go."
        />

        <meta name="twitter:title" content="FOLI-O-MATIC | Perri Schofield" />
        <meta
          name="twitter:description"
          content="Bite-sized projects for the busy creative on the go."
        />
      </Head>

      {TRIGGER_ELEMENTS.map((name) => (
        <TriggerElement key={name} className={name} />
      ))}

      {isStarted && <MenuButton />}

      <AnimatePresence>
        {!isStarted && <StartScreen handleSetIsStarted={setIsStarted} />}

        {isFocused && (
          <>
            <FocusButton
              key="focus-button-left"
              event={UI_PREV_ITEM}
              position="left"
            />

            <FocusButton
              key="focus-button-right"
              event={UI_NEXT_ITEM}
              position="right"
            />
          </>
        )}
      </AnimatePresence>

      <WebGL />
    </>
  );
};

export default Index;
