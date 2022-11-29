import { useEffect, useRef } from "react";
import gsap from "gsap";

import { WorldVendingMachine } from "./worldVendingMachine";

import { GL_START_VENDING_MACHINE } from "./config/topics";

import { CanvasParent } from "./styles";

const WebGL = () => {
  const canvasParent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    PubSub.subscribe(GL_START_VENDING_MACHINE, () => {
      setTimeout(() => {
        if (!canvasParent.current) return;

        new WorldVendingMachine(canvasParent.current);
      }, 1000);

      gsap.to(canvasParent.current, {
        delay: 2,
        duration: 1,
        opacity: 1,
        onStart: () => {},
      });
    });
  }, []);

  return (
    <>
      <CanvasParent ref={canvasParent} className={"canvasParent"} />
    </>
  );
};

export default WebGL;
