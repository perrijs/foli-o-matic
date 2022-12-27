import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";

import HomeButton from "@/components/HomeButton";
import MenuButton from "@/components/MenuButton";
import Video from "@/components/Video";
import WipeScreen from "@/components/WipeScreen";
import TransitionScreen from "@/components/TransitionScreen";

import { SELECTED_WORKS } from "@/pages/config/selectedWorks";
import { SelectedWork } from "@/pages/config/types";

import {
  ProjectWrapper,
  ContentContainer,
  ProjectTitle,
  ProjectCreditsContainer,
  ProjectCredits,
  ProjectLink,
  VideoContainer,
  ProjectInfo,
  ProjectInfoContainer,
  ProjectInfoButton,
  ProjectRolesContainer,
  ProjectRole,
  InfoButtonSpan,
  AnimationSpan,
} from "./slugStyles";

interface PageProps {
  project: SelectedWork;
}

const Project = ({ project }: PageProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [showInfo, setShowInfo] = useState<boolean>(false);

  return (
    <ProjectWrapper>
      <HomeButton />
      <MenuButton />

      <ContentContainer>
        <AnimationSpan>
          <ProjectTitle
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            transition={{ delay: 3.5, duration: 0.5, ease: "easeInOut" }}
          >
            {project.name} /
          </ProjectTitle>
        </AnimationSpan>

        <ProjectCreditsContainer>
          <AnimationSpan>
            <ProjectCredits
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              transition={{ delay: 3.6, duration: 0.5, ease: "easeInOut" }}
            >
              {project.client}, {project.date}
            </ProjectCredits>
          </AnimationSpan>

          <AnimationSpan>
            {project.url && (
              <ProjectLink
                initial={{ y: "-100%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 3.7, duration: 0.5, ease: "easeInOut" }}
              >
                <Link
                  key={project.name}
                  href={project.url}
                  passHref={true}
                  target="_blank"
                >
                  <span>Visit Website</span>
                  <Image
                    src="/images/icons/open_in_new.svg"
                    width="18"
                    height="18"
                    alt=""
                  />
                </Link>
              </ProjectLink>
            )}
          </AnimationSpan>
        </ProjectCreditsContainer>
      </ContentContainer>

      <VideoContainer>
        <Video ref={videoRef} url={project.video} />

        <AnimatePresence>
          {showInfo && (
            <ProjectInfoContainer
              key={"infoContainer"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <ProjectInfo>{project.description}</ProjectInfo>
              <ProjectRolesContainer>
                {project.roles.map((role, index) => (
                  <>
                    <ProjectRole key={role}>{role}</ProjectRole>
                    {index < project.roles.length - 1 && (
                      <ProjectRole>&#8226;</ProjectRole>
                    )}
                  </>
                ))}
              </ProjectRolesContainer>
            </ProjectInfoContainer>
          )}

          <ProjectInfoButton
            key={"infoButton"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 0.5, ease: "easeOut" }}
            onClick={() => setShowInfo(!showInfo)}
          >
            <Image src="/images/icons/info.svg" width="24" height="24" alt="" />

            <InfoButtonSpan
              key={"infoButtonSpan"}
              animate={{ rotate: showInfo ? 45 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Image
                src="/images/icons/plus.svg"
                width="24"
                height="24"
                alt=""
              />
            </InfoButtonSpan>
          </ProjectInfoButton>
        </AnimatePresence>
      </VideoContainer>

      <WipeScreen />
      <TransitionScreen />
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
