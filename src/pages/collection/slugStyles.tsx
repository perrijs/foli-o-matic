import styled from "styled-components";

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

export const ContentContainer = styled.div`
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
  opacity: 0;
  text-transform: uppercase;

  ${type.TYPE_SANS_BODY_1}
`;

export const ProjectInfoContainer = styled.div`
  display: flex;
  width: 100%;

  justify-content: space-between;
`;

export const ProjectInfo = styled.span`
  opacity: 0;
  color: ${color.PINK_4};

  ${type.TYPE_SERIF_BODY_2}
`;

export const ProjectLink = styled.div`
  display: flex;
  width: fit-content;

  justify-content: center;
  align-items: center;
  opacity: 0;

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
