import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";

import HomeButton from "@/components/HomeButton";
import ItemCanvas from "@/components/ItemCanvas";
import Footer from "@/components/Footer";
import WipeScreen from "@/components/WipeScreen";
import TransitionScreen from "@/components/TransitionScreen";

import { SELECTED_WORKS } from "src/config/selectedWorks";
import { OTHER_WORKS } from "src/config/otherWorks";
import { AWARDS } from "src/config/awards";
import { SelectedWork, OtherWork, Award } from "src/config/types";
import { ITEMS } from "@/webgl/config/items";
import { GL_SET_MODEL, UI_HANDLE_TRANSITION } from "@/webgl/config/topics";

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

interface MousePos {
  x: number;
  y: number;
}

interface PageProps {
  projects: SelectedWork[];
}

const Collection = ({ projects }: PageProps) => {
  const { loaded } = useLoading();

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
    PubSub.publish(GL_SET_MODEL, 0);

    document.body.style.overflowY = "scroll";
    document.addEventListener("mousemove", (event) => handleMouseMove(event));
  }, [handleMouseMove]);

  return (
    <CollectionWrapper>
      <HomeButton isAlt />

      <AnimatePresence>
        <TableHeaders
          key="tableHeaders"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.33, ease: "easeInOut" }}
        >
          <TableHeader>TYPE</TableHeader>
          <TableHeader>TITLE</TableHeader>
          <TableHeader>CLIENT / ORGANISATION</TableHeader>
          <TableHeader>YEAR</TableHeader>
        </TableHeaders>

        <TableSection onMouseLeave={() => PubSub.publish(GL_SET_MODEL, 99)}>
          <AnimationSpan>
            <TableSectionType
              key="selectedWorksType"
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              transition={{ delay: 2.05, duration: 0.33, ease: "easeInOut" }}
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
                    delay: 2.1 + index * 0.05,
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
              transition={{ delay: 2.4, duration: 0.33, ease: "easeInOut" }}
              onMouseEnter={() => PubSub.publish(GL_SET_MODEL, 99)}
            >
              OTHER WORKS /
            </TableSectionType>
          </AnimationSpan>

          {OTHER_WORKS.map((project: OtherWork, index) => {
            return (
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
                      delay: 2.4 + index * 0.05,
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
            );
          })}
        </TableSection>

        <TableSection>
          <AnimationSpan>
            <TableSectionType
              key="awardsType"
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              transition={{ delay: 2.65, duration: 0.33, ease: "easeInOut" }}
              onMouseEnter={() => PubSub.publish(GL_SET_MODEL, 99)}
            >
              AWARDS /
            </TableSectionType>
          </AnimationSpan>

          {AWARDS.map((award: Award, index) => {
            return (
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
                      delay: 2.65 + index * 0.05,
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
            );
          })}
        </TableSection>
      </AnimatePresence>

      {loaded && (
        <CanvasContainer ref={canvasRef}>
          <ItemCanvas />
        </CanvasContainer>
      )}

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
