import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";

import HomeButton from "@/components/HomeButton";
import MenuButton from "@/components/MenuButton";
import Video from "@/components/Video";
import WipeScreen from "@/components/WipeScreen";
import TransitionScreen from "@/components/TransitionScreen";

import { SELECTED_WORKS } from "src/config/selectedWorks";
import { SelectedWork } from "src/config/types";

import {
  ProjectWrapper,
  TitleContainer,
  ProjectTitle,
  ProjectCreditsContainer,
  ProjectCredits,
  ProjectLink,
  ContentContainer,
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

  useEffect(() => {
    document.body.style.overflowY = "hidden";
  }, []);

  return (
    <ProjectWrapper>
      <Head>
        <title>foli-o-matic! - {project.name}</title>

        <meta property="og:title" content={`foli-o-matic! - ${project.name}`} />
        <meta property="og:description" content={project.description} />

        <meta
          name="twitter:title"
          content={`foli-o-matic! - ${project.name}`}
        />
        <meta name="twitter:description" content={project.description} />
      </Head>

      <HomeButton />
      <MenuButton />

      <ContentContainer>
        <TitleContainer>
          <AnimationSpan>
            <ProjectTitle
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: "0%" }}
              transition={{ delay: 2.5, duration: 0.33, ease: "easeInOut" }}
            >
              {project.name} /
            </ProjectTitle>
          </AnimationSpan>

          <ProjectCreditsContainer>
            <AnimationSpan>
              <ProjectCredits
                initial={{ opacity: 0, y: "-100%" }}
                animate={{ opacity: 1, y: "0%" }}
                transition={{ delay: 2.55, duration: 0.33, ease: "easeInOut" }}
              >
                {project.client}, {project.date}
              </ProjectCredits>
            </AnimationSpan>

            <AnimationSpan>
              {project.url && (
                <ProjectLink
                  initial={{ opacity: 0, y: "-100%" }}
                  animate={{ opacity: 1, y: "0%" }}
                  transition={{ delay: 2.6, duration: 0.33, ease: "easeInOut" }}
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
        </TitleContainer>

        <VideoContainer>
          <Video ref={videoRef} url={project.video} />

          <AnimatePresence>
            {showInfo && (
              <ProjectInfoContainer
                key={"infoContainer"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.33, ease: "easeOut" }}
              >
                <ProjectInfo>{project.description}</ProjectInfo>
                <ProjectRolesContainer>
                  {project.roles.map((role, index) => (
                    <span key={role}>
                      <ProjectRole>{role}</ProjectRole>

                      {index < project.roles.length - 1 && (
                        <ProjectRole key={`span-${index}`}>&#8226;</ProjectRole>
                      )}
                    </span>
                  ))}
                </ProjectRolesContainer>
              </ProjectInfoContainer>
            )}

            <ProjectInfoButton
              key={"infoButton"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4, duration: 1, ease: "easeOut" }}
              onClick={() => setShowInfo(!showInfo)}
            >
              <Image
                src="/images/icons/info.svg"
                width="24"
                height="24"
                alt=""
              />

              <InfoButtonSpan
                key={"infoButtonSpan"}
                initial={{ scale: 0.75 }}
                animate={{ scale: 0.75, rotate: showInfo ? 45 : 0 }}
                transition={{ duration: 0.33, ease: "easeInOut" }}
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
      </ContentContainer>

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
