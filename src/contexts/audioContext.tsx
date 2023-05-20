import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from "react";

import { AUDIO_PLAY_TRACK } from "@/webgl/config/topics";

interface ContextProps {
  playTrack: (path: string) => void;
}

interface ProviderProps {
  children?: React.ReactNode;
}

const WebAudioContext = createContext<ContextProps>({} as ContextProps);

//TODO(pschofield): Add music player and SFX player - add gain nodes for each, and a master gain for mute/unmute.
const AudioProvider = ({ children }: ProviderProps) => {
  const audioContext = useRef<AudioContext | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  const handleSubscriptions = useCallback(() => {
    PubSub.subscribe(AUDIO_PLAY_TRACK, (_message, data) => playTrack(data));
  }, []);

  useEffect(() => {
    handleSubscriptions();
    audioContext.current = new AudioContext();
    audioPlayerRef.current = new Audio();

    const audioPlayer = audioContext.current.createMediaElementSource(
      audioPlayerRef.current
    );
    audioPlayer.connect(audioContext.current.destination);

    handleSubscriptions();
  }, [handleSubscriptions]);

  const playTrack = (file: string) => {
    if (!audioContext.current || !audioPlayerRef.current) return;

    if (audioContext.current.state === "suspended")
      audioContext.current.resume();

    audioPlayerRef.current.src = file;

    audioPlayerRef.current.play();
  };

  return (
    <WebAudioContext.Provider
      value={{
        playTrack,
      }}
    >
      {children}
    </WebAudioContext.Provider>
  );
};

const useAudio = () => useContext(WebAudioContext);

export { AudioProvider, useAudio };
