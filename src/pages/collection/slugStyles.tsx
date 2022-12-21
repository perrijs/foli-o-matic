import styled from "styled-components";
import { motion } from "framer-motion";

import * as type from "@/styles/globals/type";
import * as color from "@/styles/globals/color";
import * as spacing from "@/styles/globals/spacing";

export const ProjectWrapper = styled.div`
  display: flex;
  height: fit-content;
  height: calc(100vh - ${spacing.MARGIN_LARGE} * 2);
  max-height: 100vh;
  padding: ${spacing.MARGIN_LARGE} ${spacing.MARGIN_LARGEST};

  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${color.PINK_1};
`;

export const ContentContainer = styled(motion.div)`
  display: flex;
  width: 100%;
  margin-bottom: ${spacing.MARGIN_SMALL};

  flex-direction: column;
`;

export const ProjectTitle = styled.h1`
  width: fit-content;
  margin: 0;
  padding: 0;

  color: ${color.PINK_4};
  text-transform: uppercase;

  ${type.TYPE_SANS_BODY_1}
`;

export const ProjectCreditsContainer = styled.div`
  display: flex;
  width: 100%;

  justify-content: space-between;
`;

export const ProjectCredits = styled.span`
  color: ${color.PINK_4};

  ${type.TYPE_SERIF_BODY_2}
`;

export const ProjectLink = styled.div`
  display: flex;
  width: fit-content;

  justify-content: center;
  align-items: center;

  ${type.TYPE_SERIF_BODY_2}

  a {
    display: flex;

    justify-content: center;
    gap: ${spacing.MARGIN_EXTRA_SMALL};
    color: ${color.PINK_4};
    text-decoration: none;
  }

  img {
    margin-top: 3px;
  }

  &:hover {
    text-decoration: underline;
  }
`;

export const VideoContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;

  justify-content: center;
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

export const ProjectInfo = styled.p`
  color: ${color.WHITE};
  pointer-events: none;

  font-family: "Playfair Display", serif;
  font-size: 64px;
  font-weight: 400;
  font-style: italic;
`;

export const ProjectRolesContainer = styled.div`
  display: flex;

  gap: ${spacing.MARGIN_EXTRA_SMALL};
`;

export const ProjectRole = styled.span`
  color: ${color.WHITE};
  pointer-events: none;

  font-family: "Playfair Display", serif;
  font-size: 32px;
  font-weight: 400;
`;

interface ProjectInfoSpanProps {
  $alt?: boolean;
}

export const ProjectInfoSpan = styled(motion.span)<ProjectInfoSpanProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  color: ${(props) => (props.$alt ? "#ffffff" : "#e93535")};

  transform: translate(-50%, -50%);

  font-family: "Playfair Display", serif;
  font-size: 24px;
  font-weight: 400;
`;

export const ProjectInfoButton = styled(motion.button)`
  position: absolute;
  bottom: ${spacing.MARGIN_MEDIUM};
  right: ${spacing.MARGIN_MEDIUM};
  width: 150px;
  height: 50px;
  margin: 0;
  padding: 0;

  z-index: 1;
  background: none;
  border: none;

  &:hover {
    cursor: pointer;

    ${ProjectInfoSpan} {
      text-decoration: underline;
    }
  }
`;
