import Head from "next/head";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { useLoading } from "@/contexts/loadingContext";

import { Load } from "@/webgl/load";
import WebGL from "@/webgl/index";

import TriggerElement from "@/components/TriggerElement";
import MenuButton from "@/components/MenuButton";
import Loader from "@/components/Loader";

import { GL_FLIP_COIN } from "@/webgl/config/topics";
import { TRIGGER_ELEMENTS } from "@/webgl/config/scrollTriggers";

const Index = () => {
  const { loaded } = useLoading();
  const [start, setStart] = useState<boolean>(false);

  useEffect(() => {
    if (!loaded) {
      new Load();
    } else {
      setStart(true);
    }
  }, [loaded]);

  useEffect(() => {
    setTimeout(() => {
      PubSub.publish(GL_FLIP_COIN);
    }, 4000);
  }, [start]);

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

      <MenuButton />

      <AnimatePresence>{!start && <Loader />}</AnimatePresence>

      <WebGL />
    </>
  );
};

export default Index;
