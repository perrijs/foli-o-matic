import Head from "next/head";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { useLoading } from "@/contexts/loadingContext";

import { Load } from "@/webgl/load";
import WebGL from "@/webgl/index";

import TriggerElement from "@/components/TriggerElement";
import MenuButton from "@/components/MenuButton";
import Loader from "@/components/Loader";

import { GL_ACTIVATE_SCENE } from "@/webgl/config/topics";
import { TRIGGER_ELEMENTS } from "@/webgl/config/scrollTriggers";

const Index = () => {
  const { loaded } = useLoading();

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    if (!loaded) {
      new Load();
    }
  }, [loaded]);

  useEffect(() => {
    setTimeout(() => {
      PubSub.publish(GL_ACTIVATE_SCENE);
      setIsMenuVisible(true);
    }, 5000);
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

      {isMenuVisible && <MenuButton />}

      <AnimatePresence>{!loaded && <Loader />}</AnimatePresence>

      <WebGL />
    </>
  );
};

export default Index;
