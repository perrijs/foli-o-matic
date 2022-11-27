import styled from "styled-components";

import * as type from "@/styles/globals/type";
import * as color from "@/styles/globals/color";
import * as spacing from "@/styles/globals/spacing";

export const TooltipWrapper = styled.div`
  position: fixed;
  bottom: ${spacing.MARGIN_MEDIUM};
  left: 50%;
  width: 150px;
  height: 50px;

  transform: translateX(-50%);

  z-index: 1;
`;

export const TipContainer = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
  opacity: 0;

  width: 100%;

  text-align: center;

  span {
    color: ${color.PINK_4};

    ${type.TYPE_SANS_BODY_3}
  }
`;
