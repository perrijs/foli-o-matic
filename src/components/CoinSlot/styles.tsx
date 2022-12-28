import styled from "styled-components";

export const CanvasParent = styled.div`
  position: relative;
  width: 30vw;
  height: 30vw;
  aspect-ratio: 1/1;

  z-index: 0;

  &:hover {
    cursor: pointer;
  }
`;
