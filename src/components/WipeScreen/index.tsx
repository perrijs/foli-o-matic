import { useRef } from "react";

import { WipeScreenWrapper } from "./styles";

const WipeScreen = () => {
  const transitionScreenRef = useRef<HTMLDivElement>(null);

  return (
    <WipeScreenWrapper
      ref={transitionScreenRef}
      initial={{ y: "0%" }}
      animate={{ y: "-100%" }}
      transition={{ duration: 0.66, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (!transitionScreenRef.current) return;

        transitionScreenRef.current.style.transform = "translateY(-200%)";
      }}
    />
  );
};

export default WipeScreen;
