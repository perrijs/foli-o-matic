import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import Loader from "@/components/Loader";
import CoinSlot from "@/components/CoinSlot";
import { Load } from "@/webgl/load";

import { useLoading } from "@/contexts/loadingContext";

import { GL_INSERT_COIN } from "@/webgl/config/topics";

import { StartScreenWrapper, CoinSlotContainer } from "./styles";

const StartScreen = () => {
  const { loaded } = useLoading();

  useEffect(() => {
    new Load();
  }, []);

  return (
    <StartScreenWrapper
      initial={{ y: "0%" }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <AnimatePresence>
        {loaded ? (
          <CoinSlotContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 1, ease: "easeOut" }}
            onClick={() => PubSub.publish(GL_INSERT_COIN)}
          >
            <CoinSlot />
          </CoinSlotContainer>
        ) : (
          <Loader key="loader" />
        )}
      </AnimatePresence>
    </StartScreenWrapper>
  );
};

export default StartScreen;
