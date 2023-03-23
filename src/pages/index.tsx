import Head from "next/head";
import { useEffect, useState } from "react";

import { useLoading } from "@/contexts/loadingContext";

import { Load } from "@/webgl/load";
import WebGL from "@/webgl/index";

import ScrollTrigger from "@/components/ScrollTrigger";
import MenuButton from "@/components/MenuButton";
import Tooltip from "@/components/Tooltip";
import TransitionScreen from "@/components/TransitionScreen";

import { GL_FLIP_COIN } from "@/webgl/config/topics";
import { TRIGGER_ELEMENTS } from "@/webgl/config/scrollTriggers";
import Loader from "@/components/Loader";
import { AnimatePresence } from "framer-motion";

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
        <ScrollTrigger key={name} className={name} />
      ))}

      <MenuButton />

      <Tooltip />

      <AnimatePresence>{!start && <Loader />}</AnimatePresence>

      <WebGL />

      <TransitionScreen />
    </>
  );
};

export default Index;
