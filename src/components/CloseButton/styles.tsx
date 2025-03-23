import styled from "styled-components";

import * as color from "@/styles/globals/color";
import * as spacing from "@/styles/globals/spacing";
import * as type from "@/styles/globals/type";
import * as breakpoint from "@/styles/globals/breakpoints";

export const VendingWrapper = styled.div`
  display: flex;
  position: sticky;
  top: ${spacing.MARGIN_LARGE};
  right: ${spacing.MARGIN_LARGE};
  width: 30px;
  height: 76px;
  padding: 4px;
  box-shadow: 1px 1px ${color.RED};

  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  border: 1px solid ${color.RED};
  text-align: center;

  &:hover {
    cursor: pointer;

    div {
      background-color: #000000;
    }
  }

  @media (max-width: ${breakpoint.MOBILE_MAX}) {
    top: ${spacing.MARGIN_SMALL};
    right: ${spacing.MARGIN_SMALL};
  }
`;

export const VendingLabel = styled.span`
  color: ${color.RED};

  ${type.TYPE_SANS_BODY_2}
  font-size: 8px;
  font-weight: 500;
`;

export const CoinSlot = styled.div`
  display: flex;
  width: 10px;
  height: 50px;
  margin: auto 0;

  background-color: ${color.RED};
`;