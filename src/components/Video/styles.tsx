import styled from "styled-components";

import * as spacing from "@/styles/globals/spacing";

export const VideoPlayer = styled.video`
  width: 100%;
  height: auto;
  padding: 0 ${spacing.MARGIN_EXTRA_LARGE};

  aspect-ratio: 16 / 9;
`;
