import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { subscribe } from "pubsub-js";

import { UI_TOOLTIP_INTERACT } from "@/webgl/config/topics";

import { TipContainer, TooltipWrapper } from "./styles";

const Tooltip = () => {
  const zoomRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [canInteract, setCanInteract] = useState<boolean>(false);

  const handleSubscriptions = useCallback(() => {
    subscribe(UI_TOOLTIP_INTERACT, (_topic: string, data: boolean) =>
      setCanInteract(data)
    );
  }, []);

  useEffect(() => {
    handleSubscriptions();
  }, [handleSubscriptions]);

  return (
    <TooltipWrapper>
      <AnimatePresence>
        {canInteract ? (
          <TipContainer
            ref={zoomRef}
            key={"browtf"}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { delay: 0.33, duration: 0.33, ease: "easeOut" },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.33, ease: "easeOut" },
            }}
          >
            <span>INTERACT TO SELECT</span>
            <Image src="/images/icons/tap.svg" width="24" height="24" alt="" />
          </TipContainer>
        ) : (
          <TipContainer
            ref={scrollRef}
            key={"workcunt"}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { delay: 0.33, duration: 0.33, ease: "easeOut" },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.33, ease: "easeOut" },
            }}
          >
            <span>SCROLL TO BROWSE</span>
            <Image
              src="/images/icons/scroll.svg"
              width="24"
              height="24"
              alt=""
            />
          </TipContainer>
        )}
      </AnimatePresence>
    </TooltipWrapper>
  );
};

export default Tooltip;
