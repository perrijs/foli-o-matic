import styled from "styled-components";

import * as type from "@/styles/globals/type";
import * as color from "@/styles/globals/color";
import * as spacing from "@/styles/globals/spacing";

export const TooltipWrapper = styled.div`
  position: fixed;
  bottom: ${spacing.MARGIN_MEDIUM};
  left: 50%;

  transform: translateX(-50%);

  z-index: 1;
`;

export const TipContainer = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;

  span {
    color: ${color.PINK_4};

    ${type.TYPE_SANS_BODY_3}
  }
`;
