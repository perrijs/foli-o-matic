import { useEffect, useRef } from "react";

import { CanvasParent } from "./styles";
import { GL_START_VENDING_MACHINE } from "./config/topics";
import { WorldVendingMachine } from "./worldVendingMachine";

const WebGL = () => {
  const canvasParent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    PubSub.subscribe(GL_START_VENDING_MACHINE, () => {
      if (!canvasParent.current) return;

      new WorldVendingMachine(canvasParent.current);
    });
  }, []);

  return (
    <>
      <CanvasParent ref={canvasParent} className={"canvasParent"} />
    </>
  );
};

export default WebGL;
