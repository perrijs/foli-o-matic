import styled from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled(motion.button)`
  position: fixed;
  top: 10%;
  right: 10%;
  width: 50px;
  height: 50px;

  transform: translate(-10%, -10%);
  z-index: 1;
`;
