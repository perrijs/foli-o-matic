import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import PubSub from "pubsub-js";
import gsap from "gsap";

import { UI_HANDLE_TRANSITION } from "@/webgl/config/topics";
import { ItemData } from "@/webgl/config/types";

import { TransitionScreenWrapper } from "./styles";

const TransitionScreen = () => {
  const router = useRouter();
  const transitionScreenRef = useRef<HTMLDivElement>(null);

  const setPath = useCallback(
    (data: ItemData) => {
      if (!transitionScreenRef.current) return;

      gsap.fromTo(
        transitionScreenRef.current,
        {
          transform: "translateY(100%)",
        },
        {
          duration: 1,
          ease: "power4.inOut",
          transform: "translateY(0%)",
          onComplete: () => {
            if (data.slug === "/") {
              router.push("/");
            } else if (data.slug === "/collection") {
              router.push(data.slug);
            } else {
              router.push(`/collection/${data.slug}`);
            }
          },
        }
      );
    },
    [router]
  );

  useEffect(() => {
    PubSub.subscribe(UI_HANDLE_TRANSITION, (_topic, data) => setPath(data));
  }, [setPath]);

  return <TransitionScreenWrapper ref={transitionScreenRef} />;
};

export default TransitionScreen;
