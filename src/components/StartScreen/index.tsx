import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import Loader from "@/components/Loader";
import CoinSlot from "@/components/CoinSlot";
import { Load } from "@/webgl/load";

import { useLoading } from "@/contexts/loadingContext";

import {
  StartScreenWrapper,
  ContentContainer,
  Title,
  Credit,
  TitleSpan,
  CoinSlotContainer,
} from "./styles";

const CHARACTERS = ["f", "o", "l", "i", "-", "o", "-", "m", "a", "t", "i", "c"];

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
          <ContentContainer>
            <Title>
              {CHARACTERS.map((character, index) => (
                <TitleSpan
                  key={index}
                  initial={{ opacity: 0, y: "-150%" }}
                  animate={{ opacity: 1, y: "0%" }}
                  transition={{
                    delay: 4 + index * 0.033,
                    duration: 0.33,
                    ease: "easeInOut",
                  }}
                >
                  {character}
                </TitleSpan>
              ))}
            </Title>
            <Credit
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5, duration: 1, ease: "easeOut" }}
            >
              by PERRI SCHOFIELD
            </Credit>

            <CoinSlotContainer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 6, duration: 1, ease: "easeOut" }}
            >
              <CoinSlot />
            </CoinSlotContainer>
          </ContentContainer>
        ) : (
          <Loader key="loader" />
        )}
      </AnimatePresence>
    </StartScreenWrapper>
  );
};

export default StartScreen;
