import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from "react";

import { AUDIO_PLAY_EFFECT, AUDIO_PLAY_TRACK } from "@/webgl/config/topics";

interface ContextProps {
  playTrack: (path: string) => void;
}

interface ProviderProps {
  children?: React.ReactNode;
}

const WebAudioContext = createContext<ContextProps>({} as ContextProps);

//TODO(pschofield): SOUNDS: BEEPS x 3, SUCCESS, FAILURE. SAMPLE NOSTROMO SOUNDS FOR THIS?
//TODO(pschofield): Add gain nodes for both players, a master gain for mute/unmute.
//TODO(pschofield): Add initial audio start gain node fade in.
//TODO(pschofield): Add enum for sound files
const AudioProvider = ({ children }: ProviderProps) => {
  const audioContext = useRef<AudioContext | null>(null);
  const audioPlayerMainRef = useRef<HTMLAudioElement | null>(null);
  const audioPlayerSubRef = useRef<HTMLAudioElement | null>(null);

  const handleSubscriptions = useCallback(() => {
    PubSub.subscribe(AUDIO_PLAY_TRACK, (_message, data) => playTrack(data));
    PubSub.subscribe(AUDIO_PLAY_EFFECT, (_message, data) => playEffect(data));
  }, []);

  useEffect(() => {
    audioContext.current = new AudioContext();
    audioPlayerMainRef.current = new Audio();
    audioPlayerSubRef.current = new Audio();

    const audioSourceMain = audioContext.current.createMediaElementSource(
      audioPlayerMainRef.current
    );
    audioSourceMain.connect(audioContext.current.destination);

    const audioSourceSub = audioContext.current.createMediaElementSource(
      audioPlayerSubRef.current
    );
    audioSourceSub.connect(audioContext.current.destination);

    handleSubscriptions();
  }, [handleSubscriptions]);

  const playTrack = (file: string) => {
    if (!audioContext.current || !audioPlayerMainRef.current) return;

    if (audioContext.current.state === "suspended")
      audioContext.current.resume();

    audioPlayerMainRef.current.src = file;
    audioPlayerMainRef.current.loop = true;

    audioPlayerMainRef.current.play();
  };

  const playEffect = (file: string) => {
    if (!audioContext.current || !audioPlayerSubRef.current) return;

    if (audioContext.current.state === "suspended")
      audioContext.current.resume();

    audioPlayerSubRef.current.src = file;

    audioPlayerSubRef.current.play();
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
