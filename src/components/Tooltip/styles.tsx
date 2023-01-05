import styled from "styled-components";
import { motion } from "framer-motion";

import * as type from "@/styles/globals/type";
import * as color from "@/styles/globals/color";
import * as spacing from "@/styles/globals/spacing";

export const TooltipWrapper = styled.div`
  position: fixed;
  bottom: ${spacing.MARGIN_LARGE};
  left: 50%;
  width: 150px;
  height: 50px;

  transform: translateX(-50%);

  z-index: 1;
`;

export const TipContainer = styled(motion.div)`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);

  width: 100%;

  text-align: center;

  span {
    color: ${color.VERMILLION};

    ${type.TYPE_SANS_BODY_3}
  }
`;
