import styled from "styled-components";

import * as color from "@/styles/globals/color";

export const StartScreenWrapper = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  flex-direction: column;
  justify-content: center;
  z-index: 1;

  background-color: ${color.PINK_1};
`;
