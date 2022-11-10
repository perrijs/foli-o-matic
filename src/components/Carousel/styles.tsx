import styled from "styled-components";

import * as type from "@/styles/globals/type";
import * as color from "@/styles/globals/color";
import * as spacing from "@/styles/globals/spacing";

export const CarouselWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;

  justify-content: center;
  align-items: center;
  background-color: ${color.PINK_1};

  overflow: hidden;
`;

export const MainImageContainer = styled.div`
  position: relative;
  display: flex;

  align-items: center;
  justify-content: center;

  width: 66vw;
  aspect-ratio: 16 / 9;

  background-color: red;
`;

interface ImageContainerProps {
  $aspectRatio: number;
  $width: number;
}

export const ImageContainer = styled.div<ImageContainerProps>`
  position: absolute;
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
  width: ${({ $width }) => `${$width}vw`};

  img {
    pointer-events: none;
  }
`;
