import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { useLoading } from "@/contexts/loadingContext";

import { Load } from "@/webgl/load";
import WebGL from "@/webgl/index";

import TriggerElement from "@/components/TriggerElement";
import MenuButton from "@/components/MenuButton";
import StartScreen from "@/components/StartScreen";

import { TRIGGER_ELEMENTS } from "@/webgl/config/scrollTriggers";
import Menu from "@/components/Menu";
import { GL_ACTIVATE_LIGHTS } from "@/webgl/config/topics";

const Index = () => {
  const { loaded } = useLoading();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isLightsActive, setIsLightsActive] = useState(false);

  const handleSubscriptions = useCallback(() => {
    PubSub.subscribe(GL_ACTIVATE_LIGHTS, () => setIsLightsActive(true));
  }, [])

  useEffect(() => {
    if (loaded) return;

    new Load();

    handleSubscriptions();
  }, [loaded, handleSubscriptions]);

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

      <AnimatePresence>
        {!isStarted && (
          <StartScreen key="start-screen" handleSetIsStarted={setIsStarted} />
        )}

        {isMenuOpen && <Menu key="menu" onClose={() => setIsMenuOpen(false)} />}

        {isLightsActive && (
          <MenuButton key="menu-button" onClick={() => setIsMenuOpen(true)} />
        )}
      </AnimatePresence>

      <WebGL />
    </>
  );
};

export default Index;
