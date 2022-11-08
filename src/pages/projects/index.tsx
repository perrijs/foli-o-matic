import Link from "next/link";

import { PROJECTS } from "@/pages/config/projects";
import { Projects, Project } from "@/pages/config/types";

const Projects = ({ projects }: Projects) => {
  return (
    <>
      {projects.map((project: Project) => {
        return (
          <Link key={project.id} href={`/projects/${project.slug}`}>
            <p key={project.id}>{project.name}</p>
          </Link>
        );
      })}
    </>
  );
};

export default Projects;

export const getStaticProps = async () => {
  return {
    props: { projects: PROJECTS },
  };
};
