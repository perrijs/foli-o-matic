import { TriggerElementWrapper } from "./styles";

interface Props {
  className: string;
}

const TriggerElement = ({ className }: Props) => (
  <TriggerElementWrapper className={className} />
);

export default TriggerElement;
