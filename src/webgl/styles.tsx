import styled from "styled-components";

export const CanvasParent = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;

  z-index: 0;
  background: #fbdada;

  canvas {
    transform: translate(0) !important;
    inset: 0 !important;
  }
`;
