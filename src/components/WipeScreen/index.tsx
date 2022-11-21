import { useEffect, useRef } from "react";
import gsap from "gsap";

import { WipeScreenWrapper } from "./styles";

const WipeScreen = () => {
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

  return <WipeScreenWrapper ref={transitionScreenRef} />;
};

export default WipeScreen;
