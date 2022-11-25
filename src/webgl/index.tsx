import { useEffect, useRef } from "react";

import { WebGL } from "./webgl";

import { CanvasParent } from "./styles";
import { LOAD_COMPLETE } from "./config/topics";

const WebGLComponent = () => {
  const canvasParent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    PubSub.subscribe(LOAD_COMPLETE, () => {
      if (!canvasParent.current) return;

      new WebGL(canvasParent.current, true);
    });
  });

  return (
    <>
      <CanvasParent ref={canvasParent} className={"canvasParent"} />
    </>
  );
};

export default WebGLComponent;
