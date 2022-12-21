import styled from "styled-components";
import { motion } from "framer-motion";

export const VideoPlayer = styled(motion.video)`
  width: 100%;

  aspect-ratio: 16 / 9;
  object-fit: cover;
`;
