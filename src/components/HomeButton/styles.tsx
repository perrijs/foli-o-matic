import styled, { css } from "styled-components";

import * as color from "@/styles/globals/color";
import * as spacing from "@/styles/globals/spacing";
import * as type from "@/styles/globals/type";
import * as breakpoint from "@/styles/globals/breakpoints";

interface HomeButtonWrapperProps {
  $alt?: boolean;
}

export const HomeButtonWrapper = styled.div<HomeButtonWrapperProps>`
  display: flex;
  position: fixed;
  top: ${spacing.MARGIN_LARGE};
  left: ${spacing.MARGIN_LARGE};
  width: 30px;
  height: 76px;
  padding: 4px;
  box-shadow: 1px 1px ${color.VERMILLION};

  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  border: 1px solid ${color.VERMILLION};
  text-align: center;

  &:hover {
    cursor: pointer;

    div {
      background-color: ${color.COSMIC_AMERICANO};
    }
  }

  @media (max-width: ${breakpoint.MOBILE_MAX}) {
    top: ${spacing.MARGIN_EXTRA_SMALL};
    left: ${spacing.MARGIN_EXTRA_SMALL};
  }

  ${(props) =>
    props.$alt &&
    css`
      @media (max-width: ${breakpoint.MOBILE_MAX}) {
        position: relative;
        margin-bottom: ${spacing.MARGIN_SMALL};
      }
    `}
`;

export const VendingLabel = styled.span`
  color: ${color.VERMILLION};

  ${type.TYPE_SANS_BODY_2}
  font-size: 8px;
  font-weight: 500;
`;

export const CoinSlot = styled.div`
  display: flex;
  width: 10px;
  height: 50px;
  margin: auto 0;

  background-color: ${color.VERMILLION};
`;
