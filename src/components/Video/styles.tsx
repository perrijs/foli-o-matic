import styled from "styled-components";
import { motion } from "framer-motion";

import * as breakpoint from "@/styles/globals/breakpoints";

export const VideoPlayer = styled(motion.video)`
  width: 100%;

  aspect-ratio: 4 / 3;
  object-fit: cover;

  @media (max-width: ${breakpoint.MOBILE_MAX}) {
    aspect-ratio: 1 / 1;
  }
`;
