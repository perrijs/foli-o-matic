import styled from "styled-components";
import { motion } from "framer-motion";

import * as color from "@/styles/globals/color";

export const TransitionScreenWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  z-index: 1;
  background-color: ${color.COSMIC_AMERICANO};
`;
