import styled from "styled-components";

import * as color from "@/styles/globals/color";
import * as type from "@/styles/globals/type";
import * as spacing from "@/styles/globals/spacing";

export const StartScreenWrapper = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;

  background-color: ${color.COSMIC_LATTE};
`;

export const CopyContainer = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Credit = styled.h3`
  margin: 0 0 ${spacing.MARGIN_SMALL};
  padding: 0;

  opacity: 0;
  color: ${color.COSMIC_AMERICANO};

  ${type.TYPE_SANS_BODY_1}
`;

export const Title = styled.h1`
  margin: 0;
  padding: 0;

  opacity: 0;
  color: ${color.VERMILLION};
  text-shadow: -2px -2px ${color.COSMIC_AMERICANO};

  ${type.TYPE_CURSIVE_HEADER_1}
`;
