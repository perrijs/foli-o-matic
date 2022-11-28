import { useEffect, useRef } from "react";

import { WorldSingleItem } from "@/webgl/worldSingleItem";

import { CanvasParent } from "./styles";

const ItemCanvas = () => {
  const canvasParent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasParent.current) return;

    new WorldSingleItem(canvasParent.current);
  });

  return <CanvasParent ref={canvasParent} className={"canvasParent"} />;
};

export default ItemCanvas;
