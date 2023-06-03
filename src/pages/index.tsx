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
  GL_DEACTIVATE_FOCUS,
  GL_NEXT_ITEM,
  GL_PREV_ITEM,
} from "@/webgl/config/topics";
import CloseButton from "@/components/CloseButton";

//TODO(pschofield): Move isFocus buttons to wrapper component.
const Index = () => {
  const { loaded } = useLoading();

  const [isStarted, setIsStarted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubscriptions = () => {
    PubSub.subscribe(GL_ACTIVATE_FOCUS, () => setIsFocused(true));
    PubSub.subscribe(GL_DEACTIVATE_FOCUS, () => setIsFocused(false));
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

        {isFocused && <CloseButton key="close-button" />}

        {isFocused && (
          <FocusButton
            key="focus-button-left"
            event={GL_PREV_ITEM}
            position="left"
          />
        )}

        {isFocused && (
          <FocusButton
            key="focus-button-right"
            event={GL_NEXT_ITEM}
            position="right"
          />
        )}
      </AnimatePresence>

      <WebGL />
    </>
  );
};

export default Index;
