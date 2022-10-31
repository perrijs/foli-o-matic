import { useEffect, useRef } from "react";

import { World } from "./world";

import { CanvasParent } from "./styles";

const WebGL = () => {
  const canvasParent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasParent.current) return;

    new World(canvasParent.current);
  });

  return <CanvasParent ref={canvasParent} className={"canvasParent"} />;
};

export default WebGL;
