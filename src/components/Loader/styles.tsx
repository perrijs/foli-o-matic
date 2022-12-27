import styled from "styled-components";
import { motion } from "framer-motion";

import * as color from "@/styles/globals/color";
import * as spacing from "@/styles/globals/spacing";
import * as type from "@/styles/globals/type";

export const LoaderWrapper = styled(motion.div)`
  display: flex;
  position: absolute;
  top: 40%;
  left: 50%;
  width: 100px;
  padding: ${spacing.MARGIN_EXTRA_SMALL};

  flex-wrap: wrap;
  justify-content: space-between;
  gap: ${spacing.MARGIN_EXTRA_SMALL};
  transform: translate(-50%, -40%);
  border: 2px solid ${color.COSMIC_LATTE};
  box-shadow: 1px 1px ${color.COSMIC_LATTE};

  .active {
    color: ${color.COSMIC_AMERICANO};
    background-color: ${color.COSMIC_LATTE};
  }
`;

export const MachineScreen = styled.div`
  display: flex;
  width: 100px;
  height: 20px;

  align-items: center;
  color: ${color.COSMIC_LATTE};
  border: 2px solid ${color.COSMIC_LATTE};

  ${type.TYPE_SANS_BODY_2}

  span {
    margin-left: 4px;
  }
`;

export const Button = styled.div`
  display: flex;
  width: 20px;
  height: 20px;

  align-items: center;
  justify-content: center;
  color: ${color.COSMIC_LATTE};
  border: 2px solid ${color.COSMIC_LATTE};

  ${type.TYPE_SANS_BODY_2}
`;
