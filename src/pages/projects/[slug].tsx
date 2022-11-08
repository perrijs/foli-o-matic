import { PROJECTS } from "@/pages/config/projects";
import { Project } from "@/pages/config/types";

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

export const getStaticProps = async (context) => {
  let data;

  PROJECTS.forEach((element: Project) => {
    if (element.slug === context.params.slug) data = element;
  });

  return {
    props: { project: data },
  };
};

const Project = ({ project }: Project) => {
  return (
    <>
      <p>{project.id}</p>
      <p>{project.name}</p>
    </>
  );
};

export default Project;
