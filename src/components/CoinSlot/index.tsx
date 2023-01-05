import { useEffect, useRef } from "react";

import { CoinSlot as WorldCoinSlot } from "@/webgl/worlds/CoinSlot";

import { CanvasParent } from "./styles";

const CoinSlot = () => {
  const canvasParent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasParent.current) return;

    new WorldCoinSlot(canvasParent.current);
  }, []);

  return <CanvasParent ref={canvasParent} />;
};

export default CoinSlot;
