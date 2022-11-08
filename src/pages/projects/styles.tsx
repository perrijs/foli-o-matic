import styled from "styled-components";

import * as color from "@/styles/globals/color";

interface WrapperProps {
  $backgroundColor?: string;
}

export const ProjectsWrapper = styled.div<WrapperProps>`
  background-color: ${color.PINK_PALE};
`;
