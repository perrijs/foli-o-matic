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

    new worldCoinSlot(canvasParent.current);

    document.body.style.overflow = "hidden";

    handleSubscriptions();
  }, []);

  const handleSubscriptions = () => {
    PubSub.subscribe(LOAD_COMPLETE, () =>
      setTimeout(() => {
        setHasLoaded(true);
      }, 2000)
    );
  };

  useEffect(() => {
    if (!hasLoaded) return;

    gsap.to(canvasParent.current, {
      delay: 1,
      duration: 1,
      opacity: 1,
    });
  }, [hasLoaded]);

  const start = () => {
    if (!hasLoaded) return;

    PubSub.publish(GL_INSERT_COIN);
  };

  return <CanvasParent ref={canvasParent} onClick={start} />;
};

export default CoinSlot;
