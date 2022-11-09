import styled from "styled-components";

import * as type from "@/styles/globals/type";
import * as color from "@/styles/globals/color";
import * as spacing from "@/styles/globals/spacing";

export const CarouselWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;

  justify-content: space-between;
  align-items: center;

  overflow: hidden;
`;

interface ImageContainerProps {
  $aspectRatio: number;
  $width: number;
}

export const ImageContainer = styled.div<ImageContainerProps>`
  position: relative;

  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
  width: ${({ $width }) => `${$width}vw`};

  margin: 0 auto;
`;

export const ImagesRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 100%;

  margin-right: ${spacing.MARGIN_LARGE};

  gap: ${spacing.MARGIN_EXTRA_SMALL};

  overflow: scroll;
`;

export const RowImageContainer = styled.div`
  position: relative;

  height: 150px;

  cursor: pointer;

  flex-shrink: 0;

  &:first-child {
    margin-top: ${spacing.MARGIN_EXTRA_SMALL};
  }

  &:last-child {
    margin-bottom: ${spacing.MARGIN_EXTRA_SMALL};
  }
`;
