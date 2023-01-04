import styled from "styled-components";
import { motion } from "framer-motion";

import * as type from "@/styles/globals/type";
import * as color from "@/styles/globals/color";
import * as spacing from "@/styles/globals/spacing";
import * as breakpoint from "@/styles/globals/breakpoints";

export const CollectionWrapper = styled.div`
  padding: ${spacing.MARGIN_LARGE} ${spacing.MARGIN_LARGEST};

  background-color: ${color.COSMIC_LATTE};

  @media (max-width: ${breakpoint.MOBILE_MAX}) {
    padding: ${spacing.MARGIN_EXTRA_SMALL};
  }
`;

export const TableHeaders = styled(motion.div)`
  display: flex;
  width: 100%;

  justify-content: space-between;
  border-bottom: 1px solid ${color.COSMIC_AMERICANO};
`;

export const TableHeader = styled.h2`
  width: 30%;
  margin: 0;
  padding: 0 0 ${spacing.MARGIN_EXTRA_SMALL};

  color: ${color.COSMIC_AMERICANO};

  ${type.TYPE_SANS_HEADER_2}

  &:first-child {
    width: 20%;
  }

  &:last-child {
    width: 10%;
  }

  @media (max-width: ${breakpoint.TABLET_MAX}) {
    font-size: 16px;
  }

  @media (max-width: ${breakpoint.MOBILE_MAX}) {
    font-size: 12px;
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

export const TableRow = styled(motion.div)`
  display: flex;
  width: 100%;
  margin: 0;
  padding: ${spacing.MARGIN_EXTRA_SMALL} 0;

  justify-content: space-between;

  border-bottom: 1px solid ${color.COSMIC_AMERICANO};

  img {
    opacity: 0;
    transform: translateX(50%);
    transition: 0.33s;
  }

  &:hover {
    cursor: pointer;

    @media (min-width: ${breakpoint.MOBILE_MAX}) {
      span {
        color: ${color.VERMILLION};
      }

      img {
        transform: translateX(0%);
        opacity: 1;
      }
    }
  }
`;

export const TableSectionType = styled(motion.h3)`
  width: 100%;
  margin: 0;
  padding: ${spacing.MARGIN_EXTRA_SMALL} 0;

  color: ${color.COSMIC_AMERICANO};

  ${type.TYPE_SANS_HEADER_3}

  @media (max-width: ${breakpoint.MOBILE_MAX}) {
    font-size: 12px;
  }
`;

export const TableSectionCode = styled.span`
  width: 20%;
  margin: 0;
  padding: ${spacing.MARGIN_EXTRA_SMALL} 0;

  transition: 0.33s;
  color: ${color.COSMIC_AMERICANO};

  ${type.TYPE_SERIF_BODY_2}

  @media (max-width: ${breakpoint.MOBILE_MAX}) {
    font-size: 12px;
  }
`;

export const TableSectionEntry = styled.span`
  display: flex;
  width: 30%;
  margin: 0;
  padding: ${spacing.MARGIN_EXTRA_SMALL} 0;

  justify-content: space-between;
  align-items: center;
  transition: 0.33s;
  color: ${color.COSMIC_AMERICANO};

  ${type.TYPE_SERIF_BODY_2}

  &:last-child {
    width: 10%;
  }

  @media (max-width: ${breakpoint.MOBILE_MAX}) {
    font-size: 12px;
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

  @media (max-width: ${breakpoint.MOBILE_MAX}) {
    display: none;
  }
`;

export const AnimationSpan = styled.div`
  display: flex;

  overflow: hidden;
`;
