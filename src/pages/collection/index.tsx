import WipeScreen from "@/components/WipeScreen";
import TransitionScreen from "@/components/TransitionScreen";

import { SELECTED_WORKS } from "@/pages/config/selectedWorks";
import { OTHER_WORKS } from "@/pages/config/otherWorks";
import { AWARDS } from "@/pages/config/awards";
import { SelectedWork, OtherWork, Award } from "@/pages/config/types";
import { ITEMS } from "@/webgl/config/items";
import { UI_HANDLE_TRANSITION } from "@/webgl/config/topics";

import {
  ProjectsWrapper,
  TableHeader,
  TableHeaders,
  SectionRow,
  SectionType,
  SectionEntry,
  Section,
} from "./styles";

interface PageProps {
  projects: SelectedWork[];
}

const Projects = ({ projects }: PageProps) => {
  const handleTransition = (index: number) => {
    PubSub.publish(UI_HANDLE_TRANSITION, ITEMS[index]);
  };

  return (
    <ProjectsWrapper>
      <TableHeaders>
        <TableHeader>TYPE</TableHeader>
        <TableHeader>TITLE</TableHeader>
        <TableHeader>CLIENT / ORGANISATION</TableHeader>
        <TableHeader>YEAR</TableHeader>
      </TableHeaders>

      <Section>
        {projects.map((project: SelectedWork) => {
          return (
            <SectionRow key={project.id}>
              <SectionType>{project.type}</SectionType>
              <SectionEntry onClick={() => handleTransition(project.id)}>
                {project.name}
              </SectionEntry>
              <SectionEntry>{project.client}</SectionEntry>
              <SectionEntry>{project.date}</SectionEntry>
            </SectionRow>
          );
        })}
      </Section>

      <Section>
        {OTHER_WORKS.map((project: OtherWork) => {
          return (
            <SectionRow key={project.name}>
              <SectionType>{project.type}</SectionType>
              <SectionEntry>{project.name}</SectionEntry>
              <SectionEntry>{project.client}</SectionEntry>
              <SectionEntry>{project.date}</SectionEntry>
            </SectionRow>
          );
        })}
      </Section>

      <Section>
        {AWARDS.map((award: Award) => {
          return (
            <SectionRow key={award.name}>
              <SectionType>{award.type}</SectionType>
              <SectionEntry>{award.name}</SectionEntry>
              <SectionEntry>{award.organisation}</SectionEntry>
              <SectionEntry>{award.year}</SectionEntry>
            </SectionRow>
          );
        })}
      </Section>

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
