import { ScrollTriggerWrapper } from "./styles";

interface Props {
  className: string;
}

const ScrollTrigger = ({ className }: Props) => (
  <ScrollTriggerWrapper className={className} />
);

export default ScrollTrigger;
