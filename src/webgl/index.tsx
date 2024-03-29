import { useEffect, useRef } from "react";

import { useLoading } from "@/contexts/loadingContext";
import { VendingMachine } from "./worlds/VendingMachine";

import { CanvasParent } from "./styles";

const WebGL = () => {
  const { loaded } = useLoading();

  const canvasParent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasParent.current) return;

    new VendingMachine(canvasParent.current);
  }, [loaded]);

  return (
    <>
      {loaded && <CanvasParent ref={canvasParent} className={"canvasParent"} />}
    </>
  );
};

export default WebGL;
