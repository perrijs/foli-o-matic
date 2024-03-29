import styled from "styled-components";

import * as type from "@/styles/globals/type";
import * as color from "@/styles/globals/color";
import * as spacing from "@/styles/globals/spacing";
import * as breakpoint from "@/styles/globals/breakpoints";

export const FooterWrapper = styled.div`
  width: 100%;
  padding: ${spacing.MARGIN_MEDIUM} 0 0;
`;

export const FooterLinksContainer = styled.div`
  display: flex;
  width: fit-content;

  gap: ${spacing.MARGIN_EXTRA_SMALL};

  a {
    transition: 0.5s;
    color: ${color.COSMIC_AMERICANO};
    text-decoration: none;

    ${type.TYPE_SERIF_BODY_2}

    &:hover {
      color: ${color.VERMILLION};
    }

    @media (max-width: ${breakpoint.MOBILE_MAX}) {
      font-size: 12px;
    }
  }
`;

export const Deliniator = styled.span`
  color: ${color.COSMIC_AMERICANO};

  ${type.TYPE_SERIF_BODY_2}

  @media (max-width: ${breakpoint.MOBILE_MAX}) {
    font-size: 12px;
  }
`;
