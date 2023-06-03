import styled from "styled-components";
import { motion } from "framer-motion";

import * as color from "@/styles/globals/color";
import * as spacing from "@/styles/globals/spacing";
import * as type from "@/styles/globals/type";

export const Container = styled(motion.div)`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;

  background-color: #000000;
  z-index: 1;
`;

export const Loader = styled(motion.div)`
  display: flex;
  width: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  padding: ${spacing.MARGIN_EXTRA_SMALL};

  flex-wrap: wrap;
  justify-content: space-between;
  transform: translate(-50%, -50%);
  gap: ${spacing.MARGIN_EXTRA_SMALL};
  border: 1px solid ${color.WHITE};
  box-shadow: 1px 1px ${color.WHITE};

  .active {
    color: ${color.BLACK};
    background-color: ${color.WHITE};
  }
`;

export const LoaderScreen = styled.span`
  display: flex;
  width: 100px;
  height: 20px;
  padding-left: 4px;

  align-items: center;
  color: ${color.WHITE};
  border: 1px solid ${color.WHITE};

  ${type.TYPE_SANS_BODY_2}
`;

export const LoaderButton = styled.div`
  display: flex;
  width: 20px;
  height: 20px;

  align-items: center;
  justify-content: center;
  color: ${color.WHITE};
  border: 1px solid ${color.WHITE};

  ${type.TYPE_SANS_BODY_2}
`;

export const StartButton = styled(motion.button)`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`;
