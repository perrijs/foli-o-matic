import styled from "styled-components";

import * as type from "@/styles/globals/type";
import * as color from "@/styles/globals/color";
import * as spacing from "@/styles/globals/spacing";

interface WrapperProps {
  $backgroundColor?: string;
}

export const ProjectsWrapper = styled.div<WrapperProps>`
  padding: ${spacing.MARGIN_LARGE} ${spacing.MARGIN_EXTRA_LARGE};

  background-color: ${color.PINK_LIGHT};
`;

export const TableHeaders = styled.div`
  display: flex;
  width: 100%;
`;

export const TableHeader = styled.h2`
  width: 30%;
  margin: 0;
  padding: 0 0 ${spacing.MARGIN_EXTRA_SMALL};

  color: ${color.RED_DARK};
  border-bottom: 1px solid ${color.PINK_DARK};

  ${type.TYPE_HEADER_1}

  &:first-child {
    width: 20%;
  }

  &:last-child {
    width: 10%;
  }
`;

export const Section = styled.div`
  display: flex;
  margin: ${spacing.MARGIN_MEDIUM} 0;

  flex-direction: column;
`;

export const SectionRow = styled.div`
  display: flex;
  width: 100%;
  margin: 0 0 ${spacing.MARGIN_EXTRA_SMALL};
  padding: 0 0 ${spacing.MARGIN_EXTRA_SMALL};

  border-bottom: 1px solid ${color.PINK_MEDIUM};
`;

export const SectionType = styled.h3`
  width: 20%;
  margin: 0;
  padding: 0;

  color: ${color.RED_MEDIUM};

  ${type.TYPE_BODY_1}
`;

export const SectionEntry = styled.h3`
  width: 30%;
  margin: 0;
  padding: 0 0 ${spacing.MARGIN_MEDIUM};

  color: ${color.RED_MEDIUM};

  ${type.TYPE_BODY_2}

  &:last-child {
    width: 10%;
  }
`;
