import styled from "styled-components";

export const CanvasParent = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;

  background: radial-gradient(
    circle,
    rgba(253, 254, 236, 1) 33%,
    rgba(246, 165, 162, 1) 125%
  );

  canvas {
    transform: translate(0) !important;
  }
`;
