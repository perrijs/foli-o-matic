import styled from "styled-components";

import * as type from "@/styles/globals/type";
import * as color from "@/styles/globals/color";
import * as spacing from "@/styles/globals/spacing";

export const CollectionWrapper = styled.div`
  padding: ${spacing.MARGIN_LARGE} ${spacing.MARGIN_LARGEST};

  background-color: ${color.PINK_1};
`;

export const TableHeaders = styled.div`
  display: flex;
  width: 100%;

  justify-content: space-between;
  border-bottom: 1px solid ${color.PINK_2};
`;

export const TableHeader = styled.h2`
  width: 30%;
  margin: 0;
  padding: 0 0 ${spacing.MARGIN_EXTRA_SMALL};

  color: ${color.PINK_4};

  ${type.TYPE_SANS_HEADER_2}

  &:first-child {
    width: 20%;
  }

  &:last-child {
    width: 10%;
  }
`;

export const TableSection = styled.div`
  display: flex;
  position: relative;
  margin: ${spacing.MARGIN_SMALL} 0;

  flex-direction: column;
  z-index: 1;

  a {
    text-decoration: none;
  }
`;

export const TableRow = styled.div`
  display: flex;
  width: 100%;
  margin: 0;
  padding: ${spacing.MARGIN_EXTRA_SMALL} 0;

  justify-content: space-between;

  border-bottom: 1px solid ${color.PINK_2};

  img {
    opacity: 0;
    transform: translateX(50%);
    transition: 0.33s;
  }

  &:hover {
    cursor: pointer;

    img {
      transform: translateX(0%);
      opacity: 1;
    }
  }
`;

export const TableSectionType = styled.h3`
  width: 100%;
  margin: 0;
  padding: ${spacing.MARGIN_EXTRA_SMALL} 0;

  color: ${color.PINK_4};

  ${type.TYPE_SANS_HEADER_3}
`;

export const TableSectionCode = styled.h3`
  width: 20%;
  margin: 0;
  padding: ${spacing.MARGIN_EXTRA_SMALL} 0;

  color: ${color.PINK_4};

  ${type.TYPE_SERIF_BODY_2}
`;

export const TableSectionEntry = styled.h3`
  display: flex;
  width: 30%;
  margin: 0;
  padding: ${spacing.MARGIN_EXTRA_SMALL} 0;

  justify-content: space-between;
  align-items: center;
  color: ${color.PINK_4};

  ${type.TYPE_SERIF_BODY_2}

  &:last-child {
    width: 10%;
  }
`;

export const CanvasContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 50vw;
  height: 50vw;

  z-index: 0;
  opacity: 0;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;
