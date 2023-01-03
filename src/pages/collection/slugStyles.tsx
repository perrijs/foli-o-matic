import styled from "styled-components";
import { motion } from "framer-motion";

import * as type from "@/styles/globals/type";
import * as color from "@/styles/globals/color";
import * as spacing from "@/styles/globals/spacing";
import * as breakpoint from "@/styles/globals/breakpoints";

export const ProjectWrapper = styled.div`
  display: flex;
  height: fit-content;
  height: calc(100vh - ${spacing.MARGIN_LARGE} * 2);
  max-height: 100vh;
  padding: ${spacing.MARGIN_LARGE} ${spacing.MARGIN_LARGEST};

  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${color.COSMIC_LATTE};

  @media (max-width: ${breakpoint.TABLET_MAX}) {
    padding: ${spacing.MARGIN_LARGE};
  }

  @media (max-width: ${breakpoint.MOBILE_MAX}) {
    padding: ${spacing.MARGIN_EXTRA_SMALL};
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: ${spacing.MARGIN_SMALL};

  flex-direction: column;
`;

export const ProjectTitle = styled(motion.h1)`
  width: fit-content;
  margin: 0;
  padding: 0;

  color: ${color.COSMIC_AMERICANO};
  text-transform: uppercase;

  ${type.TYPE_SANS_BODY_1}
`;

export const ProjectCreditsContainer = styled.div`
  display: flex;
  width: 100%;

  justify-content: space-between;
`;

export const ProjectCredits = styled(motion.span)`
  color: ${color.COSMIC_AMERICANO};

  ${type.TYPE_SERIF_BODY_2}
`;

export const ProjectLink = styled(motion.div)`
  display: flex;
  width: fit-content;

  justify-content: center;
  align-items: center;

  ${type.TYPE_SERIF_BODY_2}

  a {
    display: flex;

    justify-content: center;
    gap: ${spacing.MARGIN_EXTRA_SMALL};
    color: ${color.COSMIC_AMERICANO};
    text-decoration: none;
  }

  span {
    transform: translateX(27.5%);
    transition: 0.33s;
  }

  img {
    margin-top: 3px;

    opacity: 0;
    transform: translateX(50%);
    transition: 0.33s;
  }

  &:hover {
    cursor: pointer;

    span {
      transform: translateX(0%);
      color: ${color.VERMILLION};
    }

    img {
      transform: translateX(0%);
      opacity: 1;
    }
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  position: relative;
  max-width: 80vw;
  max-height: 80vh;

  flex-direction: column;
  align-items: center;
  aspect-ratio: 4 / 3;

  @media (max-width: ${breakpoint.MOBILE_MAX}) {
    max-width: 95vw;
  }
`;

export const VideoContainer = styled.div`
  display: flex;
  position: relative;

  justify-content: center;
  overflow: hidden;
`;

export const ProjectInfoContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - ${spacing.MARGIN_MEDIUM} * 2);
  height: calc(100% - ${spacing.MARGIN_MEDIUM} * 2);
  margin: 0;
  padding: ${spacing.MARGIN_MEDIUM};

  opacity: 0;
  background-color: rgba(0, 0, 0, 0.75);
`;

export const InfoButtonSpan = styled(motion.span)`
  display: flex;
  margin: -${spacing.MARGIN_EXTRA_SMALL} 0 0 -${spacing.MARGIN_EXTRA_SMALL};

  transform-origin: center;
`;

export const ProjectInfoButton = styled(motion.button)`
  position: absolute;
  display: flex;
  bottom: ${spacing.MARGIN_MEDIUM};
  right: ${spacing.MARGIN_MEDIUM};
  margin: 0;
  padding: 0;

  z-index: 1;
  background: none;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

export const ProjectInfo = styled.p`
  color: ${color.WHITE};
  pointer-events: none;

  font-family: "Playfair Display", serif;
  font-size: 3vw;
  font-weight: 400;
  font-style: italic;

  @media (max-width: ${breakpoint.MOBILE_MAX}) {
    font-size: 5vw;
  }
`;

export const ProjectRolesContainer = styled.div`
  display: flex;

  gap: ${spacing.MARGIN_EXTRA_SMALL};

  span {
    display: flex;

    gap: ${spacing.MARGIN_EXTRA_SMALL};
  }
`;

export const ProjectRole = styled.span`
  color: ${color.WHITE};
  pointer-events: none;

  font-family: "Playfair Display", serif;
  font-size: 2vw;
  font-weight: 400;

  @media (max-width: ${breakpoint.MOBILE_MAX}) {
    font-size: 3vw;
  }
`;

export const AnimationSpan = styled.div`
  display: flex;

  overflow: hidden;
`;
