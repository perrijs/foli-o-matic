import { useEffect, useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";

import Loader from "@/components/Loader";
import CoinSlot from "@/components/CoinSlot";

import { Load } from "@/webgl/load";
import { LOAD_COMPLETE } from "@/webgl/config/topics";

import { StartScreenWrapper, ContentContainer, Title, Credit } from "./styles";

const StartScreen = () => {
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  const handleSubscriptions = useCallback(() => {
    PubSub.subscribe(LOAD_COMPLETE, () => {
      setTimeout(() => {
        setHasLoaded(true);
      }, 2000);
    });
  }, []);

  useEffect(() => {
    new Load();

    handleSubscriptions();
  }, [handleSubscriptions]);

  return (
    <StartScreenWrapper
      initial={{ y: "0%" }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <AnimatePresence>
        {hasLoaded ? (
          <ContentContainer
            key="copyContainer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
          >
            <Title>foli-o-matic!</Title>
            <Credit>by PERRI SCHOFIELD</Credit>

            <CoinSlot />
          </ContentContainer>
        ) : (
          <Loader key="loader" />
        )}
      </AnimatePresence>
    </StartScreenWrapper>
  );
};

export default StartScreen;
