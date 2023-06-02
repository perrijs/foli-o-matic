import styled from "styled-components";
import { motion } from "framer-motion";

interface WrapperProps {
  $position: string;
}

export const Wrapper = styled(motion.button)<WrapperProps>`
  position: fixed;
  top: 50%;
  width: 50px;
  height: 50px;

  transform: translate(-25%, -50%);
  z-index: 10;

  ${(props) => (props.$position === "left" ? `left: 25%` : "right: 25%")};
`;
