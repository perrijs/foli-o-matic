import styled from "styled-components";

import * as type from "@/styles/globals/type";
import * as color from "@/styles/globals/color";
import * as spacing from "@/styles/globals/spacing";
import * as breakpoint from "@/styles/globals/breakpoints";
import { motion } from "framer-motion";

export const Container = styled(motion.div)`
  display: flex;
  position: fixed;
  bottom: ${spacing.MARGIN_LARGE};
  left: ${spacing.MARGIN_LARGE};
  width: 250px;
  height: 50px;
  background-color: ${color.PINK};
  box-shadow: 2px 2px ${color.RED};
  border: 1px solid ${color.RED};
  border-radius: 10px;

  flex-direction: column;
  z-index: 1;
  padding: ${spacing.MARGIN_EXTRA_SMALL} ${spacing.MARGIN_MEDIUM};

  @media (max-width: ${breakpoint.MOBILE_MAX}) {
    bottom: ${spacing.MARGIN_MEDIUM};
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const CloseButton = styled.button` 
  display: flex;
  position: absolute;
  top: ${spacing.MARGIN_EXTRA_SMALL};
  right: 3px;
  ${type.TYPE_SANS_BODY_1}
  color: ${color.RED};
  text-transform: uppercase;
  background: none;
  border: none;
  cursor: pointer;
`;

export const LinkWrapper = styled.span`
  ${type.TYPE_SERIF_BODY_2}

  margin-bottom: ${spacing.MARGIN_EXTRA_SMALL};

  a {
    width: fit-content;
    gap: 6px;
    display: flex;
    justify-content: center;
    align-items: center;

    color: ${color.RED};

    img {
      margin-top: 4px;
    }
  }
`;

export const Client = styled.span`
  ${type.TYPE_SERIF_BODY_2}

  font-style: italic;

  color: ${color.RED};
`;