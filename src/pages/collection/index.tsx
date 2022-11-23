/* eslint-disable @next/next/no-img-element */

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

import ItemCanvas from "@/components/ItemCanvas";
import Footer from "@/components/Footer";
import WipeScreen from "@/components/WipeScreen";
import TransitionScreen from "@/components/TransitionScreen";

import { SELECTED_WORKS } from "@/pages/config/selectedWorks";
import { OTHER_WORKS } from "@/pages/config/otherWorks";
import { AWARDS } from "@/pages/config/awards";
import { ITEMS } from "@/webgl/config/items";
import { UI_HANDLE_TRANSITION } from "@/webgl/config/topics";
import { SelectedWork, OtherWork, Award } from "@/pages/config/types";

import {
  CollectionWrapper,
  TableHeader,
  TableHeaders,
  TableSection,
  TableRow,
  TableSectionType,
  TableSectionEntry,
  TableSectionCode,
  CanvasContainer,
} from "./styles";

interface MousePos {
  x: number;
  y: number;
}

interface PageProps {
  projects: SelectedWork[];
}

const Collection = ({ projects }: PageProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef<MousePos>({ x: 0, y: 0 });

  const handleTransition = (index: number) => {
    PubSub.publish(UI_HANDLE_TRANSITION, ITEMS[index]);
  };

  const setImagePosition = useCallback(() => {
    if (!canvasRef.current) return;

    canvasRef.current.style.top = `${mousePos.current.y}px`;

    canvasRef.current.style.left = `${mousePos.current.x}px`;
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      mousePos.current = { x: event.pageX, y: event.pageY };

      setImagePosition();
    },
    [setImagePosition]
  );

  useEffect(() => {
    const fadeInElement = document.querySelectorAll(".fadeIn");

    fadeInElement.forEach((element, index) => {
      gsap.fromTo(
        element,
        { opacity: 0 },
        { duration: 0.1, delay: 1 + 0.025 * index, opacity: 1 }
      );
    });

    document.addEventListener("mousemove", (event) => handleMouseMove(event));
  }, [handleMouseMove]);

  return (
    <CollectionWrapper>
      <TableHeaders className="fadeIn">
        <TableHeader>TYPE</TableHeader>
        <TableHeader>TITLE</TableHeader>
        <TableHeader>CLIENT / ORGANISATION</TableHeader>
        <TableHeader>YEAR</TableHeader>
      </TableHeaders>

      <TableSection>
        <TableSectionType className="fadeIn">SELECTED WORKS /</TableSectionType>
        {projects.map((project: SelectedWork) => {
          return (
            <TableRow
              className="fadeIn"
              key={project.id}
              onClick={() => handleTransition(project.id)}
            >
              <TableSectionCode>{project.code}</TableSectionCode>
              <TableSectionEntry>{project.name}</TableSectionEntry>
              <TableSectionEntry>{project.client}</TableSectionEntry>
              <TableSectionEntry>
                {project.date}
                <Image
                  src="/images/icons/arrow_right.svg"
                  width="18"
                  height="18"
                  alt=""
                />
              </TableSectionEntry>
            </TableRow>
          );
        })}
      </TableSection>

      <TableSection>
        <TableSectionType className="fadeIn">OTHER WORKS /</TableSectionType>
        {OTHER_WORKS.map((project: OtherWork) => {
          return (
            <Link
              key={project.name}
              href={project.url}
              passHref={true}
              target="_blank"
            >
              <TableRow className="fadeIn">
                <TableSectionCode>{project.code}</TableSectionCode>
                <TableSectionEntry>{project.name}</TableSectionEntry>
                <TableSectionEntry>{project.client}</TableSectionEntry>
                <TableSectionEntry>
                  {project.date}
                  <Image
                    src="/images/icons/open_in_new.svg"
                    width="18"
                    height="18"
                    alt=""
                  />
                </TableSectionEntry>
              </TableRow>
            </Link>
          );
        })}
      </TableSection>

      <TableSection>
        <TableSectionType className="fadeIn">AWARDS /</TableSectionType>
        {AWARDS.map((award: Award) => {
          return (
            <Link
              key={award.name}
              href={award.url}
              passHref={true}
              target="_blank"
            >
              <TableRow className="fadeIn">
                <TableSectionCode>{award.code}</TableSectionCode>
                <TableSectionEntry>{award.name}</TableSectionEntry>
                <TableSectionEntry>{award.organisation}</TableSectionEntry>
                <TableSectionEntry>
                  {award.year}
                  <Image
                    src="/images/icons/open_in_new.svg"
                    width="18"
                    height="18"
                    alt=""
                  />
                </TableSectionEntry>
              </TableRow>
            </Link>
          );
        })}
      </TableSection>

      <CanvasContainer ref={canvasRef}>
        <ItemCanvas />
      </CanvasContainer>

      <WipeScreen />
      <TransitionScreen />

      <Footer />
    </CollectionWrapper>
  );
};

export default Collection;

export const getStaticProps = async () => {
  return {
    props: { projects: SELECTED_WORKS },
  };
};
