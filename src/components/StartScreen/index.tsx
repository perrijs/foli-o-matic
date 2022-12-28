import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import Loader from "@/components/Loader";
import CoinSlot from "@/components/CoinSlot";
import { Load } from "@/webgl/load";

import { useLoading } from "@/contexts/loadingContext";

import { StartScreenWrapper, ContentContainer, Title, Credit } from "./styles";

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
          <ContentContainer
            key="copyContainer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 0.5, ease: "easeOut" }}
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
