import styled from "styled-components";

import * as color from "@/styles/globals/color";
import * as spacing from "@/styles/globals/spacing";
import * as type from "@/styles/globals/type";

export const VendingWrapper = styled.div`
  display: flex;
  position: fixed;
  top: ${spacing.MARGIN_LARGE};
  left: ${spacing.MARGIN_LARGE};
  width: 30px;
  height: 76px;
  padding: 4px;
  box-shadow: 1px 1px ${color.PINK_4};

  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  border: 1px solid ${color.PINK_4};
  text-align: center;

  &:hover {
    cursor: pointer;

    div {
      background-color: ${color.BLACK};
    }
  }
`;

export const VendingLabel = styled.span`
  color: ${color.PINK_4};

  ${type.TYPE_SANS_BODY_2}
  font-size: 8px;
  font-weight: 500;
`;

export const CoinSlot = styled.div`
  display: flex;
  width: 10px;
  height: 50px;
  margin: auto 0;

  background-color: ${color.PINK_4};
`;
