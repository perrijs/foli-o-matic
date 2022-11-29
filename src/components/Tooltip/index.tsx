import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { subscribe } from "pubsub-js";

import { UI_TOOLTIP_SCROLL, UI_TOOLTIP_TAP } from "@/webgl/config/topics";

import { TipContainer, TooltipWrapper } from "./styles";

const Tooltip = () => {
  const zoomRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [showScroll, setShowScroll] = useState<boolean>(false);
  const [showTap, setShowTap] = useState<boolean>(false);

  const handleSubscriptions = useCallback(() => {
    subscribe(UI_TOOLTIP_SCROLL, showScrollTip);

    subscribe(UI_TOOLTIP_TAP, showTapTip);
  }, []);

  useEffect(() => {
    handleSubscriptions();
  }, [handleSubscriptions]);

  const showScrollTip = (_topic: string, data: string) => {
    if (data) setShowScroll(true);

    if (!scrollRef.current) return;

    gsap.to(scrollRef.current, {
      duration: 1,
      opacity: data ? 1 : 0,
      onComplete: () => {
        if (!data) setShowScroll(false);
      },
    });
  };

  const showTapTip = (_topic: string, data: string) => {
    if (data) setShowTap(true);

    if (!zoomRef.current) return;

    gsap.to(zoomRef.current, {
      duration: 1,
      opacity: data ? 1 : 0,
      onComplete: () => {
        if (!data) setShowTap(false);
      },
    });
  };

  return (
    <TooltipWrapper>
      <TipContainer ref={scrollRef}>
        <span>SCROLL TO BROWSE</span>
        <Image src="/images/icons/scroll.svg" width="24" height="24" alt="" />
      </TipContainer>

      <TipContainer ref={zoomRef}>
        <span>INTERACT TO SELECT</span>
        <Image src="/images/icons/tap.svg" width="24" height="24" alt="" />
      </TipContainer>
    </TooltipWrapper>
  );
};

export default Tooltip;
