import { useEffect, useRef } from "react";

import { CanvasParent } from "./styles";

const ItemCanvas = () => {
  const canvasParent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasParent.current) return;

    //TODO: Implement FloatingItem here.
  }, []);

  return <CanvasParent ref={canvasParent} className={"canvasParent"} />;
};

export default ItemCanvas;
