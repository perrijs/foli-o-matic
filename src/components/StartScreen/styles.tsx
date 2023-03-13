import styled from "styled-components";
import { motion } from "framer-motion";

import * as color from "@/styles/globals/color";
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
  z-index: 2;
  background-color: ${color.COSMIC_AMERICANO};
`;

export const CoinSlotContainer = styled(motion.div)`
  display: flex;
  width: 50vw;
  height: 50vw;
  aspect-ratio: 1/1;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: ${breakpoint.MOBILE_MAX}) {
    width: 100vw;
    height: 100vw;
  }
`;
