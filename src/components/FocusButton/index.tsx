import { Wrapper } from "./styles";

interface Props {
  event: string;
  position: string;
}

const FocusButton = ({ event, position }: Props) => (
  <Wrapper
    onClick={() => PubSub.publish(event)}
    $position={position}
    initial={{
      opacity: 0,
    }}
    animate={{
      opacity: 1,
    }}
    exit={{
      opacity: 0,
    }}
  />
);

export default FocusButton;
