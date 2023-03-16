import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import { useLoading } from "@/contexts/loadingContext";

import { Load } from "@/webgl/load";
import Loader from "@/components/Loader";

import { GL_START_VENDING_MACHINE } from "@/webgl/config/topics";

import { StartScreenWrapper } from "./styles";

const StartScreen = () => {
  const { loaded } = useLoading();

  useEffect(() => {
    new Load();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      PubSub.publish(GL_START_VENDING_MACHINE);
    }, 3000);
  }, [loaded]);

  return (
    <StartScreenWrapper
      initial={{ y: "0%" }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <AnimatePresence>
        <Loader key="loader" />
      </AnimatePresence>
    </StartScreenWrapper>
  );
};

export default StartScreen;
