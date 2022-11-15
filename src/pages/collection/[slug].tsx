import Link from "next/link";
import Image from "next/image";

import MenuButton from "@/components/MenuButton";
import Video from "@/components/Video";
import WipeScreen from "@/components/WipeScreen";
import TransitionScreen from "@/components/TransitionScreen";

import { SELECTED_WORKS } from "@/pages/config/selectedWorks";
import { SelectedWork } from "@/pages/config/types";

import {
  ProjectWrapper,
  ContentContainer,
  ProjectDescriptionContainer,
  ProjectTitle,
  ProjectDescription,
  ProjectLink,
  ProjectInfoContainer,
  InfoContainerSection,
  SectionTitle,
  SectionBodyContainer,
  SectionBody,
} from "./slugStyles";
import Footer from "@/components/Footer";

interface PageProps {
  project: SelectedWork;
}

const Project = ({ project }: PageProps) => {
  return (
    <ProjectWrapper>
      <MenuButton />

      <Video url={project.video} />

      <ContentContainer>
        <ProjectDescriptionContainer>
          <ProjectTitle>{project.name} /</ProjectTitle>

          <ProjectDescription>{project.description}</ProjectDescription>

          {project.url && (
            <ProjectLink>
              <Link
                key={project.name}
                href={project.url}
                passHref={true}
                target="_blank"
              >
                VIEW WEBSITE
                <Image
                  src="/images/icons/open_in_new.svg"
                  width="18"
                  height="18"
                  alt=""
                />
              </Link>
            </ProjectLink>
          )}
        </ProjectDescriptionContainer>

        <ProjectInfoContainer>
          <InfoContainerSection>
            <SectionTitle>
              <span>CLIENT</span>
              <span>/</span>
            </SectionTitle>
            <SectionBody>{project.client}</SectionBody>
          </InfoContainerSection>

          <InfoContainerSection>
            <SectionTitle>
              <span>YEAR</span>
              <span>/</span>
            </SectionTitle>
            <SectionBody>{project.date}</SectionBody>
          </InfoContainerSection>

          <InfoContainerSection>
            <SectionTitle>
              <span>ROLES</span>
              <span>/</span>
            </SectionTitle>
            <SectionBodyContainer>
              {project.roles.map((role, index) => (
                <SectionBody key={index}>{role}</SectionBody>
              ))}
            </SectionBodyContainer>
          </InfoContainerSection>
        </ProjectInfoContainer>
      </ContentContainer>

      <WipeScreen backgroundColor={project.color} />
      <TransitionScreen />

      <Footer />
    </ProjectWrapper>
  );
};

export default Project;

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
