import Head from "next/head";

import ScrollTrigger from "@/components/ScrollTrigger";
import MenuButton from "@/components/MenuButton";
import Tooltip from "@/components/Tooltip";
import TransitionScreen from "@/components/TransitionScreen";
import WipeScreen from "@/components/WipeScreen";
import WebGL from "@/webgl/index";

import { TRIGGER_ELEMENTS } from "@/webgl/config/scrollTriggers";

const Index = () => (
  <>
    <Head>
      <title>FOLI-O-MATIC | Perri Schofield</title>

      <meta property="og:title" content="FOLI-O-MATIC | Perri Schofield" />
      <meta
        name="description"
        content="Bite sized digital snacks for the busy creative on the go!"
      />

      <meta name="twitter:title" content="FOLI-O-MATIC | Perri Schofield" />
      <meta
        name="twitter:description"
        content="Bite sized digital snacks for the busy creative on the go!"
      />
    </Head>

    {TRIGGER_ELEMENTS.map((name) => (
      <ScrollTrigger key={name} className={name} />
    ))}

    <MenuButton />

    <Tooltip />

    <WebGL />

    <WipeScreen />
    <TransitionScreen />
  </>
);

export default Index;
