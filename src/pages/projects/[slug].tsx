import WipeScreen from "@/components/WipeScreen";

import { PROJECTS } from "@/pages/config/projects";
import { Project } from "@/pages/config/types";

interface PageProps {
  project: Project;
}

const Project = ({ project }: PageProps) => {
  return (
    <>
      <p>{project.id}</p>
      <p>{project.name}</p>

      <WipeScreen backgroundColor={project.color} />
    </>
  );
};

export default Project;

export const getStaticPaths = async () => {
  const paths = PROJECTS.map((project: any) => {
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

  PROJECTS.forEach((element: Project) => {
    if (element.slug === context.params.slug) data = element;
  });

  return {
    props: { project: data },
  };
};
