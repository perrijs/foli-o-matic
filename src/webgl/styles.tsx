import styled from "styled-components";

export const CanvasParent = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;

  background: #ffbfc3;

  canvas {
    transform: translate(0) !important;
    inset: 0 !important;
  }
`;
