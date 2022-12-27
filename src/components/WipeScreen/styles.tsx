import styled from "styled-components";

import * as color from "@/styles/globals/color";

export const WipeScreenWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  z-index: 1;
  background-color: ${color.COSMIC_AMERICANO};
`;
