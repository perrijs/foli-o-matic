import * as breakpoint from "@/styles/globals/breakpoints";

export const TYPE_CURSIVE_HEADER_1 = `
  font-family: Yellowtail, cursive;
  font-size: 96px;
  line-height: 96px;

  @media (max-width: ${breakpoint.MOBILE_MAX}) {
    font-size: 64px;
    line-height: 64px;
  }
`;

export const TYPE_SANS_HEADER_1 = `
  font-family: Roboto, sans-serif;
  font-size: 96px;
  line-height: 96px;
  font-weight: 700;
`;

export const TYPE_SANS_HEADER_2 = `
  font-family: Roboto, sans-serif;
  font-size: 20px;
  font-weight: 500;
`;

export const TYPE_SANS_HEADER_3 = `
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-weight: 500;
`;

export const TYPE_SANS_BODY_1 = `
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-weight: 500;
`;

export const TYPE_SANS_BODY_2 = `
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-weight: 400;
`;

export const TYPE_SANS_BODY_3 = `
  font-family: Roboto, sans-serif;
  font-size: 12px;
  font-weight: 500;
`;

export const TYPE_SERIF_HEADER_1 = `
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  font-weight: 600;
`;

export const TYPE_SERIF_HEADER_2 = `
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  font-weight: 600;
`;

export const TYPE_SERIF_BODY_1 = `
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  font-weight: 500;
`;

export const TYPE_SERIF_BODY_2 = `
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  font-weight: 400;
`;
