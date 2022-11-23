import { useEffect, useRef } from "react";

import { WebGL } from "@/webgl/webgl";

import { CanvasParent } from "./styles";

const ItemCanvas = () => {
  const canvasParent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasParent.current) return;

    new WebGL(canvasParent.current, false);
  });

  return (
    <>
      <CanvasParent ref={canvasParent} className={"canvasParent"} />
    </>
  );
};

export default ItemCanvas;
