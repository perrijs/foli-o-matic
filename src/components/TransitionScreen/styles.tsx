import styled from "styled-components";

import * as color from "@/styles/globals/color";

export const TransitionScreenWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  z-index: 1;
  transform: translateY(-100%);
  background-color: ${color.PINK_2};
`;
