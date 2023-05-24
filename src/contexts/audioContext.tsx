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

//TODO(pschofield): Add initial master gain fade in.
//TODO(pschofield): Add mute/unmute logic.
//TODO(pschofield): Add button click logic.
//TODO(pschofield): Add audio file preloading.
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

    const audioSourceSub = audioContext.current.createMediaElementSource(
      audioPlayerSubRef.current
    );

    //Master gain
    const gainNodeMaster = audioContext.current.createGain();
    gainNodeMaster.gain.value = 1;

    //Track gain
    const gainNodeMain = audioContext.current.createGain();
    gainNodeMain.gain.value = 1;
    audioSourceMain
      .connect(gainNodeMain)
      .connect(gainNodeMaster)
      .connect(audioContext.current.destination);

    //Effects gain
    const gainNodeSub = audioContext.current.createGain();
    gainNodeSub.gain.value = 1;
    audioSourceSub
      .connect(gainNodeSub)
      .connect(gainNodeMaster)
      .connect(audioContext.current.destination);

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
