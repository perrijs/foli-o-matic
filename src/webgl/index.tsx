import { useEffect, useRef } from "react";

import { CanvasParent } from "./styles";
import { LOAD_COMPLETE } from "./config/topics";
import { WorldVendingMachine } from "./worldVendingMachine";

const WebGL = () => {
  const canvasParent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    PubSub.subscribe(LOAD_COMPLETE, () => {
      if (!canvasParent.current) return;

      new WorldVendingMachine(canvasParent.current);
    });
  });

  return (
    <>
      <CanvasParent ref={canvasParent} className={"canvasParent"} />
    </>
  );
};

export default WebGL;
