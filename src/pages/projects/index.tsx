import WipeScreen from "@/components/WipeScreen";
import TransitionScreen from "@/components/TransitionScreen";

import { SELECTED_WORKS } from "@/pages/config/selectedWorks";
import { OTHER_WORKS } from "@/pages/config/otherWorks";
import { AWARDS } from "@/pages/config/awards";
import { SelectedWork, OtherWork, Award } from "@/pages/config/types";
import { ITEMS } from "@/webgl/config/items";
import { UI_HANDLE_TRANSITION } from "@/webgl/config/topics";

import { ProjectsWrapper } from "./styles";

interface PageProps {
  projects: SelectedWork[];
}

const Projects = ({ projects }: PageProps) => {
  const handleTransition = (index: number) => {
    PubSub.publish(UI_HANDLE_TRANSITION, ITEMS[index]);
  };

  return (
    <ProjectsWrapper>
      <p>SELECTED WORKS</p>
      {projects.map((project: SelectedWork) => {
        return (
          <p key={project.id} onClick={() => handleTransition(project.id)}>
            {project.name}
          </p>
        );
      })}

      <p>OTHER WORKS</p>
      {OTHER_WORKS.map((project: OtherWork) => {
        return <p key={project.name}>{project.name}</p>;
      })}

      <p>AWARDS</p>
      {AWARDS.map((award: Award) => {
        return <p key={award.name}>{award.name}</p>;
      })}

      <WipeScreen />
      <TransitionScreen />
    </ProjectsWrapper>
  );
};

export default Projects;

export const getStaticProps = async () => {
  return {
    props: { projects: SELECTED_WORKS },
  };
};
