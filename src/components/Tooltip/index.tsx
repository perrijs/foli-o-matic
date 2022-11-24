import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { subscribe } from "pubsub-js";

import { UI_TOOLTIP_SCROLL, UI_TOOLTIP_ZOOM } from "@/webgl/config/topics";

import { TipContainer, TooltipWrapper } from "./styles";

const Tooltip = () => {
  const zoomRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [showScroll, setShowScroll] = useState<boolean>(false);
  const [showZoom, setShowZoom] = useState<boolean>(false);

  const handleSubscriptions = useCallback(() => {
    subscribe(UI_TOOLTIP_SCROLL, showScrollTip);

    subscribe(UI_TOOLTIP_ZOOM, showZoomTip);
  }, []);

  useEffect(() => {
    handleSubscriptions();
  }, [handleSubscriptions]);

  const showScrollTip = (_topic: string, data: string) => {
    if (data) setShowScroll(true);

    setTimeout(() => {
      if (!scrollRef.current) return;

      gsap.to(scrollRef.current, {
        duration: 1,
        opacity: data ? 1 : 0,
        onComplete: () => {
          if (!data) setShowScroll(false);
        },
      });
    }, 100);
  };

  const showZoomTip = (_topic: string, data: string) => {
    if (data) setShowZoom(true);

    setTimeout(() => {
      if (!zoomRef.current) return;

      gsap.to(zoomRef.current, {
        duration: 1,
        opacity: data ? 1 : 0,
        onComplete: () => {
          if (!data) setShowZoom(false);
        },
      });
    }, 100);
  };

  return (
    <TooltipWrapper>
      {showScroll && (
        <TipContainer ref={scrollRef}>
          <span>SCROLL TO PERUSE</span>
          <Image src="/images/icons/scroll.svg" width="24" height="24" alt="" />
        </TipContainer>
      )}

      {showZoom && (
        <TipContainer ref={zoomRef}>
          <span>TAP TO ZOOM</span>
          <Image
            src="/images/icons/zoom_in.svg"
            width="24"
            height="24"
            alt=""
          />
        </TipContainer>
      )}
    </TooltipWrapper>
  );
};

export default Tooltip;
