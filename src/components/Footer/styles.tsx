import styled from "styled-components";

import * as type from "@/styles/globals/type";
import * as color from "@/styles/globals/color";
import * as spacing from "@/styles/globals/spacing";

export const FooterWrapper = styled.div`
  width: 100%;
  padding: ${spacing.MARGIN_MEDIUM} 0 0;
`;

export const FooterLinksContainer = styled.div`
  display: flex;
  width: fit-content;

  gap: ${spacing.MARGIN_EXTRA_SMALL};

  a {
    color: ${color.VERMILLION};
    text-decoration: none;

    ${type.TYPE_SERIF_BODY_2}

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Deliniator = styled.span`
  color: ${color.VERMILLION};

  ${type.TYPE_SERIF_BODY_2}
`;
