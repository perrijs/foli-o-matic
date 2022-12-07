import styled from "styled-components";

import * as color from "@/styles/globals/color";
import * as spacing from "@/styles/globals/spacing";
import * as type from "@/styles/globals/type";

export const MenuWrapper = styled.div`
  display: flex;
  position: fixed;
  top: ${spacing.MARGIN_LARGE};
  right: ${spacing.MARGIN_LARGE};
  width: 50px;
  padding: 4px;

  flex-wrap: wrap;
  justify-content: space-between;
  gap: 4px;
  border: 1px solid ${color.PINK_4};
  box-shadow: 1px 1px ${color.PINK_4};

  z-index: 1;

  .active {
    color: #ffffff;
    background-color: ${color.PINK_4};
  }

  &:hover {
    cursor: pointer;
  }
`;

export const MachineScreen = styled.div`
  display: flex;
  width: 50px;
  height: 10px;

  align-items: center;
  color: ${color.PINK_4};
  border: 1px solid ${color.PINK_4};

  ${type.TYPE_SANS_BODY_2}
  font-size: 8px;

  span {
    margin-left: 2px;
  }
`;

export const Button = styled.div`
  display: flex;
  width: 10px;
  height: 10px;

  align-items: center;
  justify-content: center;
  color: ${color.PINK_4};
  border: 1px solid ${color.PINK_4};

  ${type.TYPE_SANS_BODY_2}
  font-size: 8px;
`;
