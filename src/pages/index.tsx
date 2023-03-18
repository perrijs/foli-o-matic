import Head from "next/head";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { useLoading } from "@/contexts/loadingContext";

import WebGL from "@/webgl/index";

import ScrollTrigger from "@/components/ScrollTrigger";
import StartScreen from "@/components/StartScreen";
import MenuButton from "@/components/MenuButton";
import Tooltip from "@/components/Tooltip";
import TransitionScreen from "@/components/TransitionScreen";
import WipeScreen from "@/components/WipeScreen";

import { GL_START_VENDING_MACHINE, GL_FLIP_COIN } from "@/webgl/config/topics";
import { TRIGGER_ELEMENTS } from "@/webgl/config/scrollTriggers";

const Index = () => {
  const { loaded } = useLoading();
  const [show, setShow] = useState<boolean>(!loaded);

  useEffect(() => {
    PubSub.subscribe(GL_START_VENDING_MACHINE, () => {
      setShow(false);

      PubSub.publish(GL_FLIP_COIN);
    });
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
        <ScrollTrigger key={name} className={name} />
      ))}

      <AnimatePresence>{show && <StartScreen />}</AnimatePresence>

      <MenuButton />

      <Tooltip />

      <WebGL />

      {loaded && <WipeScreen />}
      <TransitionScreen />
    </>
  );
};

export default Index;
