import styled from "styled-components";

import * as type from "@/styles/globals/type";
import * as color from "@/styles/globals/color";
import * as spacing from "@/styles/globals/spacing";

export const ProjectWrapper = styled.div`
  display: flex;
  height: fit-content;
  min-height: 100vh;
  padding: ${spacing.MARGIN_LARGE} ${spacing.MARGIN_EXTRA_LARGE};

  flex-direction: column;
  align-items: center;

  background-color: ${color.PINK_1};
`;

export const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  margin: ${spacing.MARGIN_MEDIUM} 0 0;

  justify-content: space-between;
`;

export const ProjectDescriptionContainer = styled.div`
  display: flex;

  flex-direction: column;
`;

export const ProjectTitle = styled.h2`
  margin: 0 0 ${spacing.MARGIN_SMALL};
  padding: 0;

  color: ${color.PINK_4};

  ${type.TYPE_SANS_HEADER_1};
`;

export const ProjectDescription = styled.p`
  width: 400px;
  margin: 0 0 ${spacing.MARGIN_SMALL};
  padding: 0;

  color: ${color.PINK_4};

  ${type.TYPE_SERIF_BODY_2}
`;

export const ProjectLink = styled.div`
  display: flex;
  width: fit-content;

  justify-content: center;

  ${type.TYPE_SANS_BODY_1};

  a {
    display: flex;

    justify-content: center;
    gap: ${spacing.MARGIN_EXTRA_SMALL};
    color: ${color.PINK_4};

    text-decoration: none;
  }

  &:hover {
    text-decoration: underline;
  }
`;

export const ProjectInfoContainer = styled.div`
  display: flex;

  flex-direction: column;
`;

export const InfoContainerSection = styled.div`
  display: flex;
  margin-bottom: ${spacing.MARGIN_SMALL};

  flex-direction: column;
`;

export const SectionTitle = styled.h3`
  display: flex;
  width: 65px;
  margin: 0 0 4px;
  padding: 0;

  justify-content: space-between;

  color: ${color.PINK_4};

  ${type.TYPE_SANS_HEADER_3}
`;

export const SectionBodyContainer = styled.div`
  display: flex;

  flex-direction: column;
  text-align: left;
`;

export const SectionBody = styled.span`
  color: ${color.PINK_4};

  ${type.TYPE_SERIF_BODY_2}
`;