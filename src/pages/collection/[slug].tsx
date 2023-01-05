import { useEffect } from "react";
import Head from "next/head";

import HomeButton from "@/components/HomeButton";
import MenuButton from "@/components/MenuButton";
import Project from "@/components/Project";
import WipeScreen from "@/components/WipeScreen";
import TransitionScreen from "@/components/TransitionScreen";

import { SELECTED_WORKS } from "src/config/selectedWorks";
import { SelectedWork } from "src/config/types";

interface PageProps {
  project: SelectedWork;
}

const ProjectPage = ({ project }: PageProps) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
  }, []);

  return (
    <>
      <Head>
        <title>FOLI-O-MATIC | {project.name}</title>

        <meta property="og:title" content={`FOLI-O-MATIC | ${project.name}`} />
        <meta property="og:description" content={project.description} />

        <meta name="twitter:title" content={`FOLI-O-MATIC | ${project.name}`} />
        <meta name="twitter:description" content={project.description} />
      </Head>

      <HomeButton />
      <MenuButton />

      <Project project={project} />

      <WipeScreen />
      <TransitionScreen />
    </>
  );
};

export default ProjectPage;

export const getStaticPaths = async () => {
  const paths = SELECTED_WORKS.map((project) => {
    return {
      params: { slug: project.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: { params: { slug: string } }) => {
  let data;

  SELECTED_WORKS.forEach((element) => {
    if (element.slug === context.params.slug) data = element;
  });

  return {
    props: { project: data },
  };
};
