import styled from "styled-components";

import * as color from "@/styles/globals/color";

interface WrapperProps {
  $backgroundColor?: string;
}

export const WipeScreenWrapper = styled.div<WrapperProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background-color: ${({ $backgroundColor }) =>
    $backgroundColor ? $backgroundColor : color.PINK_2};

  z-index: 1;
`;
