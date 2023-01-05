import { useEffect } from "react";
import Head from "next/head";

import HomeButton from "@/components/HomeButton";
import Footer from "@/components/Footer";
import WipeScreen from "@/components/WipeScreen";
import TransitionScreen from "@/components/TransitionScreen";

import { SELECTED_WORKS } from "src/config/selectedWorks";
import { SelectedWork } from "src/config/types";

import Collection from "@/components/Collection";

interface PageProps {
  projects: SelectedWork[];
}

const CollectionPage = ({ projects }: PageProps) => {
  useEffect(() => {
    document.body.style.overflowY = "scroll";
  }, []);

  return (
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

      <HomeButton isAlt />

      <Collection projects={projects} />

      <WipeScreen />
      <TransitionScreen />

      <Footer />
    </>
  );
};

export default CollectionPage;

export const getStaticProps = async () => {
  return {
    props: { projects: SELECTED_WORKS },
  };
};
