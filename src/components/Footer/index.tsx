import Link from "next/link";

import { Deliniator, FooterLinksContainer, FooterWrapper } from "./styles";

const Footer = () => (
  <FooterWrapper>
    <FooterLinksContainer>
      <Link
        href="https://www.github.com/perrijs"
        passHref={true}
        target="_blank"
      >
        GitHub
      </Link>

      <Deliniator>/</Deliniator>

      <Link
        href="https://www.twitter.com/perrijs"
        passHref={true}
        target="_blank"
      >
        Twitter
      </Link>

      <Deliniator>/</Deliniator>

      <Link href="mailto:hello@perrijs.io" passHref={true} target="_blank">
        Email
      </Link>
    </FooterLinksContainer>
  </FooterWrapper>
);

export default Footer;
