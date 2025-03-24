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
import { GL_ACTIVATE_LIGHTS, UI_CLOSE_ITEM, UI_SET_ITEM } from "@/webgl/config/topics";
import ItemLink from "@/components/ItemLink";
import { SELECTED_WORKS } from "src/config/selectedWorks";

const Index = () => {
  const { loaded } = useLoading();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isLightsActive, setIsLightsActive] = useState(false);

  const [activeWork, setActiveWork] = useState<number | null>(null);

  const handleSubscriptions = useCallback(() => {
    PubSub.subscribe(GL_ACTIVATE_LIGHTS, () => setIsLightsActive(true));
    PubSub.subscribe(UI_CLOSE_ITEM, () => setActiveWork(null));
    PubSub.subscribe(UI_SET_ITEM, (_topic, data) =>
      setActiveWork(data)
    );
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

        <AnimatePresence mode="wait">
          {SELECTED_WORKS.map((work, index) => (
            work.id === activeWork &&
              <ItemLink 
                key={`link-${index}`} 
                name={work.name} 
                client={work.client}
                date={work.date}
                href={work.href}
              />
          ))}
        </AnimatePresence>
      </AnimatePresence>

      <WebGL />
    </>
  );
};

export default Index;
