import { useEffect, useRef, useState } from "react";

import { worldCoinSlot } from "@/webgl/worldCoinSlot";

import { CanvasParent } from "./styles";
import { GL_START_VENDING_MACHINE, LOAD_COMPLETE } from "@/webgl/config/topics";

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
    PubSub.subscribe(LOAD_COMPLETE, () => setHasLoaded(true));
  };

  const start = () => {
    if (!hasLoaded) return;

    document.body.style.overflow = "scroll";

    PubSub.publish(GL_START_VENDING_MACHINE);
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
