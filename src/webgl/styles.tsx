import styled from "styled-components";

import * as color from "@/styles/globals/color";

export const CanvasParent = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;

  z-index: 0;
  background: ${color.PINK_LIGHT};

  canvas {
    transform: translate(0) !important;
    inset: 0 !important;
  }
`;
