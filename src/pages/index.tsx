import Head from "next/head";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { useLoading } from "@/contexts/loadingContext";

import { Load } from "@/webgl/load";
import WebGL from "@/webgl/index";

import TriggerElement from "@/components/TriggerElement";
import MenuButton from "@/components/MenuButton";
import StartScreen from "@/components/StartScreen";

import { AUDIO_PLAY_TRACK, GL_ACTIVATE_SCENE } from "@/webgl/config/topics";
import { TRIGGER_ELEMENTS } from "@/webgl/config/scrollTriggers";

const Index = () => {
  const { loaded } = useLoading();

  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!loaded) {
      new Load();

      handleSubscriptions();
    }
  }, [loaded]);

  const handleSubscriptions = () => {
    PubSub.subscribe(GL_ACTIVATE_SCENE, () => {
      setStarted(true);
      PubSub.publish(AUDIO_PLAY_TRACK, "/audio/elevator_music.mp3");
    });
  };

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

      {started && <MenuButton />}

      <AnimatePresence>{!started && <StartScreen />}</AnimatePresence>

      <WebGL />
    </>
  );
};

export default Index;
