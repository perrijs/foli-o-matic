import { useEffect, useRef } from "react";
import gsap from "gsap";

import { WipeScreenWrapper } from "./styles";

interface Props {
  backgroundColor?: string;
}

const WipeScreen = ({ backgroundColor }: Props) => {
  const transitionScreenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      transitionScreenRef.current,
      {
        transform: "translateY(0%)",
      },
      {
        duration: 1,
        ease: "power4.inOut",
        transform: "translateY(-100%)",
      }
    );
  }, []);

  return (
    <WipeScreenWrapper
      ref={transitionScreenRef}
      $backgroundColor={backgroundColor}
    />
  );
};

export default WipeScreen;
