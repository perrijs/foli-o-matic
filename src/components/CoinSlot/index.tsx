import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import { worldCoinSlot } from "@/webgl/worldCoinSlot";
import { GL_INSERT_COIN, LOAD_COMPLETE } from "@/webgl/config/topics";

import { CanvasParent } from "./styles";

const CoinSlot = () => {
  const canvasParent = useRef<HTMLDivElement>(null);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!canvasParent.current) return;

    document.body.style.overflow = "hidden";

    new worldCoinSlot(canvasParent.current);

    handleSubscriptions();
  }, []);

  const handleSubscriptions = () => {
    PubSub.subscribe(LOAD_COMPLETE, () => {
      if (!canvasParent.current) return;

      setHasLoaded(true);

      gsap.to(canvasParent.current, {
        delay: 1,
        duration: 1,
        opacity: 1,
      });
    });
  };

  const start = () => {
    if (!hasLoaded) return;

    PubSub.publish(GL_INSERT_COIN);
  };

  return (
    <>
      <CanvasParent
        ref={canvasParent}
        className={"canvasParent"}
        onClick={start}
      />
    </>
  );
};

export default CoinSlot;
