import styled from "styled-components";
import { motion } from "framer-motion";

import * as color from "@/styles/globals/color";
import * as spacing from "@/styles/globals/spacing";
import * as type from "@/styles/globals/type";
import * as breakpoint from "@/styles/globals/breakpoints";

export const Wrapper = styled(motion.button)`
  display: flex;
  position: fixed;
  top: ${spacing.MARGIN_LARGE};
  right: ${spacing.MARGIN_LARGE};
  width: 55px;
  padding: 4px;

  flex-wrap: wrap;
  justify-content: space-between;
  gap: 4px;
  border: 1px solid ${color.RED};
  box-shadow: 1px 1px ${color.RED};
  background: none;

  z-index: 1;

  .active {
    color: ${color.WHITE};
    background-color: ${color.RED};
  }

  &:hover {
    cursor: pointer;
  }

  @media (max-width: ${breakpoint.MOBILE_MAX}) {
    top: ${spacing.MARGIN_SMALL};
    right: ${spacing.MARGIN_SMALL};
  }
`;

export const MachineScreen = styled.div`
  display: flex;
  width: 50px;
  height: 10px;

  align-items: center;
  color: ${color.RED};
  border: 1px solid ${color.RED};

  ${type.TYPE_SANS_BODY_2}
  font-size: 8px;

  span {
    margin-left: 2px;
  }
`;

export const MachineButton = styled.div`
  display: flex;
  width: 10px;
  height: 10px;

  align-items: center;
  justify-content: center;
  color: ${color.RED};
  border: 1px solid ${color.RED};

  ${type.TYPE_SANS_BODY_2}
  font-size: 8px;
`;
