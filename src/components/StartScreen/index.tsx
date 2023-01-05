import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import Loader from "@/components/Loader";
import CoinSlot from "@/components/CoinSlot";
import { Load } from "@/webgl/load";

import { useLoading } from "@/contexts/loadingContext";

import { GL_INSERT_COIN } from "@/webgl/config/topics";
import { TITLE_CHARACTERS } from "src/config/titleCharacters";

import {
  StartScreenWrapper,
  ContentContainer,
  Title,
  Credit,
  TitleSpan,
  CoinSlotContainer,
} from "./styles";

const StartScreen = () => {
  const { loaded } = useLoading();
  const [titleComplete, setTitleComplete] = useState<boolean>(false);

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
              {TITLE_CHARACTERS.map((character, index) => (
                <TitleSpan
                  key={index}
                  initial={{ y: "-150%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    delay: 4 + index * 0.033,
                    duration: 0.33,
                    ease: "easeInOut",
                  }}
                  onAnimationComplete={() => {
                    if (index === TITLE_CHARACTERS.length - 1)
                      setTitleComplete(true);
                  }}
                >
                  {character}
                </TitleSpan>
              ))}
            </Title>

            <Credit
              initial={{ opacity: 0 }}
              animate={{ opacity: titleComplete ? 1 : 0 }}
              transition={{ delay: 1, duration: 1, ease: "easeOut" }}
            >
              by PERRI SCHOFIELD
            </Credit>

            <CoinSlotContainer
              $ready={titleComplete}
              initial={{ opacity: 0 }}
              animate={{ opacity: titleComplete ? 1 : 0 }}
              transition={{ delay: 2, duration: 1, ease: "easeOut" }}
              onClick={() => {
                if (!titleComplete) return;

                PubSub.publish(GL_INSERT_COIN);
              }}
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
