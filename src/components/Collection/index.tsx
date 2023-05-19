import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";

import ItemCanvas from "@/components/ItemCanvas";

import { OTHER_WORKS } from "src/config/otherWorks";
import { AWARDS } from "src/config/awards";
import { SelectedWork, OtherWork, Award } from "src/config/types";
import { GL_SET_MODEL } from "@/webgl/config/topics";

import { useLoading } from "@/contexts/loadingContext";

import {
  CollectionWrapper,
  AnimationSpan,
  TableHeader,
  TableHeaders,
  TableSection,
  TableRow,
  TableSectionType,
  TableSectionEntry,
  TableSectionCode,
  CanvasContainer,
} from "./styles";
import { Vec2 } from "three";

interface Props {
  projects: SelectedWork[];
}

//TODO(pschofield): Refactor to be an animated overlay.
const Collection = ({ projects }: Props) => {
  const { loaded } = useLoading();

  const canvasRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef<Vec2>({ x: 0, y: 0 });

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
    PubSub.publish(GL_SET_MODEL, 0);

    document.body.style.overflowY = "scroll";
    document.addEventListener("mousemove", (event) => handleMouseMove(event));
  }, [handleMouseMove]);

  return (
    <CollectionWrapper>
      <AnimatePresence>
        <AnimationSpan>
          <TableHeaders
            key="tableHeaders"
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            transition={{ delay: 1, duration: 0.33, ease: "easeInOut" }}
            onMouseEnter={() => PubSub.publish(GL_SET_MODEL, 99)}
          >
            <TableHeader>TYPE</TableHeader>
            <TableHeader>TITLE</TableHeader>
            <TableHeader>CLIENT / ORGANISATION</TableHeader>
            <TableHeader>YEAR</TableHeader>
          </TableHeaders>
        </AnimationSpan>

        <TableSection onMouseLeave={() => PubSub.publish(GL_SET_MODEL, 99)}>
          <AnimationSpan>
            <TableSectionType
              key="selectedWorksType"
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              transition={{ delay: 1.05, duration: 0.33, ease: "easeInOut" }}
              onMouseEnter={() => PubSub.publish(GL_SET_MODEL, 99)}
            >
              SELECTED WORKS /
            </TableSectionType>
          </AnimationSpan>

          {projects.map((project: SelectedWork, index) => {
            return (
              <AnimationSpan key={project.name}>
                <TableRow
                  initial={{ opacity: 0, y: "-100%" }}
                  animate={{ opacity: 1, y: "0%" }}
                  transition={{
                    delay: 1.1 + index * 0.05,
                    duration: 0.33,
                    ease: "easeInOut",
                  }}
                  onClick={() => handleTransition(project.id)}
                  onMouseMove={() => {
                    if (!canvasRef.current) return;

                    canvasRef.current.style.opacity = "1";
                    PubSub.publish(GL_SET_MODEL, index);
                  }}
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
              </AnimationSpan>
            );
          })}
        </TableSection>

        <TableSection>
          <AnimationSpan>
            <TableSectionType
              key="otherWorksType"
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              transition={{ delay: 1.4, duration: 0.33, ease: "easeInOut" }}
              onMouseEnter={() => PubSub.publish(GL_SET_MODEL, 99)}
            >
              OTHER WORKS /
            </TableSectionType>
          </AnimationSpan>

          {OTHER_WORKS.map((project: OtherWork, index) => (
            <Link
              key={project.name}
              href={project.url}
              passHref={true}
              target="_blank"
            >
              <AnimationSpan>
                <TableRow
                  initial={{ opacity: 0, y: "-100%" }}
                  animate={{ opacity: 1, y: "0%" }}
                  transition={{
                    delay: 1.4 + index * 0.05,
                    duration: 0.33,
                    ease: "easeInOut",
                  }}
                >
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
              </AnimationSpan>
            </Link>
          ))}
        </TableSection>

        <TableSection>
          <AnimationSpan>
            <TableSectionType
              key="awardsType"
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              transition={{ delay: 1.65, duration: 0.33, ease: "easeInOut" }}
              onMouseEnter={() => PubSub.publish(GL_SET_MODEL, 99)}
            >
              AWARDS /
            </TableSectionType>
          </AnimationSpan>

          {AWARDS.map((award: Award, index) => (
            <Link
              key={award.name}
              href={award.url}
              passHref={true}
              target="_blank"
            >
              <AnimationSpan>
                <TableRow
                  initial={{ opacity: 0, y: "-100%" }}
                  animate={{ opacity: 1, y: "0%" }}
                  transition={{
                    delay: 1.65 + index * 0.05,
                    duration: 0.33,
                    ease: "easeInOut",
                  }}
                >
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
              </AnimationSpan>
            </Link>
          ))}
        </TableSection>
      </AnimatePresence>

      {loaded && (
        <CanvasContainer ref={canvasRef}>
          <ItemCanvas />
        </CanvasContainer>
      )}
    </CollectionWrapper>
  );
};

export default Collection;
