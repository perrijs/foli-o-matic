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
  ProjectTitle,
  ProjectInfoContainer,
  ProjectInfo,
  ProjectLink,
} from "./slugStyles";
import { useEffect, useRef } from "react";
import HomeButton from "@/components/HomeButton";

interface PageProps {
  project: SelectedWork;
}

const Project = ({ project }: PageProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    gsap.fromTo(
      videoRef.current,
      { scale: 0 },
      {
        delay: 2,
        duration: 0.5,
        scale: 1,
        ease: "back.out(1.5)",
        onComplete: () => {
          const fadeInElements = document.querySelectorAll(".fadeIn");
          fadeInElements.forEach((element) => {
            gsap.fromTo(element, { opacity: 0 }, { duration: 1, opacity: 1 });
          });
        },
      }
    );
  }, []);

  return (
    <ProjectWrapper>
      <HomeButton />
      <MenuButton />

      <ContentContainer>
        <ProjectTitle className="fadeIn">{project.name} /</ProjectTitle>

        <ProjectInfoContainer>
          <ProjectInfo className="fadeIn">
            {project.client}, {project.date}
          </ProjectInfo>

          {project.url && (
            <ProjectLink className="fadeIn">
              <Link
                key={project.name}
                href={project.url}
                passHref={true}
                target="_blank"
              >
                Visit Website
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
      </ContentContainer>

      <Video ref={videoRef} url={project.video} />

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
