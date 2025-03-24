import Link from "next/link";
import { Client, CloseButton, Container, LinkWrapper } from "./styles";
import { UI_CLOSE_ITEM } from "@/webgl/config/topics";
import Image from "next/image";

type ItemLinkProps = {
  name: string;
  href: string;
  client: string;
  date: string;
};

const ItemLink = ({ 
  name,
  href,
  client,
  date
 }: ItemLinkProps) => (
  <Container
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.66 }}
  >
    <LinkWrapper>
      <Link href={href} target="_blank" referrerPolicy="no-referrer">
        {name}

        <Image
          src="/images/icons/open_in_new.svg"
          width="16"
          height="16"
          alt=""
        />
      </Link>
    </LinkWrapper>

    <Client>{client}, {date}</Client>

    <CloseButton onClick={() => PubSub.publish(UI_CLOSE_ITEM)}>X</CloseButton>
  </Container>
);

export default ItemLink;
