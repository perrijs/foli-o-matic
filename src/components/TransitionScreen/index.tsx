import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import gsap from "gsap";

import { GL_SET_PROJECT } from "@/webgl/config/topics";
import { ItemData } from "@/webgl/config/types";

import { TransitionScreenWrapper } from "./styles";

const TransitionScreen = () => {
  const router = useRouter();
  const transitionScreenRef = useRef<HTMLDivElement>(null);

  const setProject = useCallback(
    (data: ItemData) => {
      if (!transitionScreenRef.current) return;

      transitionScreenRef.current.style.background = data.color;

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
            router.push(`/projects/${data.slug}`);
          },
        }
      );
    },
    [router]
  );

  useEffect(() => {
    PubSub.subscribe(GL_SET_PROJECT, (_topic, data) => setProject(data));
  }, [setProject]);

  return <TransitionScreenWrapper ref={transitionScreenRef} />;
};

export default TransitionScreen;
