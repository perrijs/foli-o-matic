import MenuButton from "@/components/MenuButton";
import WipeScreen from "@/components/WipeScreen";
import TransitionScreen from "@/components/TransitionScreen";

import { SELECTED_WORKS } from "@/pages/config/selectedWorks";
import { SelectedWork } from "@/pages/config/types";

interface PageProps {
  project: SelectedWork;
}

const Project = ({ project }: PageProps) => {
  return (
    <>
      <MenuButton />

      <p>{project.id}</p>
      <p>{project.name}</p>

      <WipeScreen backgroundColor={project.color} />
      <TransitionScreen />
    </>
  );
};

export default Project;

export const getStaticPaths = async () => {
  const paths = SELECTED_WORKS.map((project: SelectedWork) => {
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

  SELECTED_WORKS.forEach((element: SelectedWork) => {
    if (element.slug === context.params.slug) data = element;
  });

  return {
    props: { project: data },
  };
};
