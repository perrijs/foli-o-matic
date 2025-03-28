import styled from "styled-components";

export const CanvasParent = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;

  z-index: 0;

  canvas {
    user-select: none;
  }
`;
