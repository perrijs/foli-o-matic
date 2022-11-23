import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

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
import { useEffect } from "react";

interface PageProps {
  project: SelectedWork;
}

const Project = ({ project }: PageProps) => {
  useEffect(() => {
    const fadeInElements = document.querySelectorAll(".fadeIn");

    fadeInElements.forEach((element, index) => {
      gsap.fromTo(
        element,
        { opacity: 0 },
        { duration: 0.5, delay: 1 + 0.05 * index, opacity: 1 }
      );
    });
  }, []);

  return (
    <ProjectWrapper>
      <MenuButton />

      <ContentContainer>
        <ProjectDescriptionContainer>
          <ProjectTitle className="fadeIn">{project.name}</ProjectTitle>

          <ProjectDescription className="fadeIn">
            {project.description}
          </ProjectDescription>

          <ProjectInfoContainer>
            <InfoContainerSection>
              <SectionTitle className="fadeIn">CLIENT /</SectionTitle>
              <SectionBody className="fadeIn">{project.client}</SectionBody>
            </InfoContainerSection>

            <InfoContainerSection>
              <SectionTitle className="fadeIn">YEAR /</SectionTitle>
              <SectionBody className="fadeIn">{project.date}</SectionBody>
            </InfoContainerSection>

            <InfoContainerSection>
              <SectionTitle className="fadeIn">ROLES /</SectionTitle>
              <SectionBodyContainer>
                {project.roles.map((role, index) => (
                  <SectionBody key={index} className="fadeIn">
                    {role}
                    {index !== project.roles.length - 1 && <span>,</span>}
                  </SectionBody>
                ))}
              </SectionBodyContainer>
            </InfoContainerSection>

            {project.url && (
              <ProjectLink className="fadeIn">
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
          </ProjectInfoContainer>
        </ProjectDescriptionContainer>
      </ContentContainer>

      <Video className="fadeIn" url={project.video} />

      <WipeScreen />
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
