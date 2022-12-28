import { useEffect, useRef } from "react";

import { SingleItem } from "@/webgl/worlds/SingleItem";

import { CanvasParent } from "./styles";

const ItemCanvas = () => {
  const canvasParent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasParent.current) return;

    new SingleItem(canvasParent.current);
  }, []);

  return <CanvasParent ref={canvasParent} className={"canvasParent"} />;
};

export default ItemCanvas;
