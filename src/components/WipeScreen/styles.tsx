import styled from "styled-components";

interface WrapperProps {
  $backgroundColor: string;
}

export const WipeScreenWrapper = styled.div<WrapperProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background-color: ${({ $backgroundColor }) => $backgroundColor};

  z-index: 1;
`;
