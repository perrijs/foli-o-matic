import styled, { css } from "styled-components";
import { motion } from "framer-motion";

import * as color from "@/styles/globals/color";
import * as type from "@/styles/globals/type";
import * as spacing from "@/styles/globals/spacing";
import * as breakpoint from "@/styles/globals/breakpoints";

export const StartScreenWrapper = styled(motion.div)`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background-color: ${color.COSMIC_AMERICANO};
`;

export const ContentContainer = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  display: flex;
  margin: 0;
  padding: ${spacing.MARGIN_SMALL};

  color: ${color.VERMILLION};
  text-shadow: 2px 2px ${color.COSMIC_LATTE};

  ${type.TYPE_CURSIVE_HEADER_1}
`;

export const TitleSpan = styled(motion.span)`
  padding: 0 30px;
  margin: 0 -30px;
`;

export const Credit = styled(motion.h2)`
  margin: -${spacing.MARGIN_SMALL} 0 0;
  padding: 0;

  color: ${color.COSMIC_LATTE};

  ${type.TYPE_SANS_BODY_1}
`;

interface CoinSlotContainerProps {
  $ready: boolean;
}

export const CoinSlotContainer = styled(motion.div)<CoinSlotContainerProps>`
  display: flex;
  width: 35vw;
  height: 35vw;
  aspect-ratio: 1/1;

  @media (max-width: ${breakpoint.MOBILE_MAX}) {
    width: 100vw;
    height: 100vw;
  }

  ${(props) =>
    props.$ready &&
    css`
      &:hover {
        cursor: pointer;
      }
    `}
`;
