import { GL_DEACTIVATE_FOCUS } from "@/webgl/config/topics";
import { Wrapper } from "./styles";

const CloseButton = () => (
  <Wrapper
    onClick={() => PubSub.publish(GL_DEACTIVATE_FOCUS)}
    initial={{
      opacity: 0,
    }}
    animate={{
      opacity: 1,
      transition: { duration: 1 },
    }}
    exit={{
      opacity: 0,
      transition: { duration: 1 },
    }}
  />
);

export default CloseButton;
