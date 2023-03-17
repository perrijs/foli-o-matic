import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import PubSub from "pubsub-js";

import { GL_FLIP_COIN, UI_HANDLE_TRANSITION } from "@/webgl/config/topics";
import { ItemData } from "@/webgl/config/types";

import { TransitionScreenWrapper } from "./styles";

const TransitionScreen = () => {
  const router = useRouter();
  const transitionScreenRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<ItemData>();

  useEffect(() => {
    PubSub.subscribe(UI_HANDLE_TRANSITION, (_topic, data) => setData(data));
  }, []);

  const setPath = () => {
    if (!data) return;

    if (data.slug === "/") {
      router.push("/");

      setTimeout(() => {
        PubSub.publish(GL_FLIP_COIN);
      }, 1000);
    } else if (data.slug === "/collection") {
      router.push(data.slug);
    } else {
      router.push(`/collection/${data.slug}`);
    }
  };

  return (
    <TransitionScreenWrapper
      ref={transitionScreenRef}
      initial={{ y: "100%" }}
      animate={{ y: data ? "0%" : "100%" }}
      transition={{ duration: 0.66, ease: "easeInOut" }}
      onAnimationComplete={() => setPath()}
    />
  );
};

export default TransitionScreen;
