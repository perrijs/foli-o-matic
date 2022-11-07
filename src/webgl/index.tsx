import { useEffect, useRef } from "react";

import { WebGL } from "./webgl";

import { CanvasParent } from "./styles";

const WebGLComponent = () => {
  const canvasParent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasParent.current) return;

    new WebGL(canvasParent.current);
  });

  return (
    <>
      <CanvasParent ref={canvasParent} className={"canvasParent"} />
    </>
  );
};

export default WebGLComponent;
