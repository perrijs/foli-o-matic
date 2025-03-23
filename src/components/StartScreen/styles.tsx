import styled from "styled-components";
import { motion } from "framer-motion";

import * as color from "@/styles/globals/color";
import * as spacing from "@/styles/globals/spacing";
import * as type from "@/styles/globals/type";

export const Container = styled(motion.div)`
  display: flex;
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;

  background-color: ${color.PINK};
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
  transform: translate(-50%, -75%);
  gap: ${spacing.MARGIN_EXTRA_SMALL};
  border: 1px solid ${color.RED};
  box-shadow: 1px 1px ${color.RED};

  .active {
    color: ${color.WHITE};
    background-color: ${color.RED};
  }
`;

export const LoaderScreen = styled.span`
  display: flex;
  width: 100px;
  height: 20px;
  padding-left: 4px;

  align-items: center;
  color: ${color.RED};
  border: 1px solid ${color.RED};

  ${type.TYPE_SANS_BODY_2}
`;

export const LoaderButton = styled.div`
  display: flex;
  width: 20px;
  height: 20px;

  align-items: center;
  justify-content: center;
  color: ${color.RED};
  border: 1px solid ${color.RED};

  ${type.TYPE_SANS_BODY_2}
`;

export const StartButton = styled(motion.button)`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  background: none;
  border: none;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;

  transform: translate(-50%, -50%);
`;

export const HandWrapper = styled(motion.div)`
  position: relative;

  transform: rotate(180deg);
`;

export const CoinWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: ${color.RED};
  color: ${color.WHITE};
  border-radius: 50%;
  font-size: 25px;
`;

export const Pocket = styled.div`
  width: 75px;
  height: 100px;
  border-top: 3px solid ${color.RED};
  background-color: ${color.PINK};
  z-index: 2;
`;