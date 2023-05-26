import {
  createContext,
  useContext,
  useCallback,
  useRef,
  useState,
} from "react";
import gsap from "gsap";

import { AssetController } from "@/webgl/controllers/AssetController";
import { AUDIO_PLAY_EFFECT, AUDIO_PLAY_TRACK } from "@/webgl/config/topics";

interface ContextProps {
  initiateAudio: () => void;
  handleMute: () => void;
}

interface ProviderProps {
  children?: React.ReactNode;
}

const WebAudioContext = createContext<ContextProps>({} as ContextProps);

export enum AudioEffects {}
//TODO(pschofield): ADD FILE VALUES HERE AND REPLACE SITEWIDE FILE REFS WITH NUMBERS

//TODO(pschofield): Remove "any" types across bufferSource implementation.
//TODO(pschofield): Add button click logic.
//TODO(pschofield): Add enum for sound files
const AudioProvider = ({ children }: ProviderProps) => {
  const audioContext = useRef<AudioContext>();
  const audioPlayerMainRef = useRef<HTMLAudioElement | null>(null);
  const audioPlayerSubRef = useRef<HTMLAudioElement | null>(null);
  const gainNodeMaster = useRef<GainNode | null>(null);
  const trackBufferSources = useRef<any[]>([]);
  const effectBufferSources = useRef<any[]>([]);

  const [isMuted, setIsMuted] = useState(false);

  const handleSubscriptions = useCallback(() => {
    PubSub.subscribe(AUDIO_PLAY_TRACK, (_message, data) => playTrack(data));
    PubSub.subscribe(AUDIO_PLAY_EFFECT, (_message, data) => playEffect(data));
  }, []);

  const initiateAudio = () => {
    handleSubscriptions();

    const assetController = AssetController.getInstance();

    audioContext.current = assetController.audioContext;
    // audioPlayerMainRef.current = new Audio();
    // audioPlayerSubRef.current = new Audio();

    // const audioSourceMain = audioContext.current.createMediaElementSource(
    //   audioPlayerMainRef.current
    // );

    // const audioSourceSub = audioContext.current.createMediaElementSource(
    //   audioPlayerSubRef.current
    // );

    //Master gain
    gainNodeMaster.current = audioContext.current.createGain();
    gainNodeMaster.current.gain.value = 0;

    const audioBufferSources = assetController.audioBufferSources;
    if (audioBufferSources) {
      audioBufferSources.forEach((audioBufferSource) => {
        if (!audioContext.current) return;

        const { source, type } = audioBufferSource;

        source
          .connect(gainNodeMaster.current)
          .connect(audioContext.current.destination);

        if (type === "track") {
          if (trackBufferSources.current)
            trackBufferSources.current.push(source);
        } else {
          if (effectBufferSources.current)
            effectBufferSources.current.push(source);
        }
      });

      console.log(trackBufferSources.current);
    }

    //Track gain
    // const gainNodeMain = audioContext.current.createGain();
    // gainNodeMain.gain.value = 0.25;
    // audioSourceMain
    //   .connect(gainNodeMain)
    //   .connect(gainNodeMaster.current)
    //   .connect(audioContext.current.destination);

    // //Effects gain
    // const gainNodeSub = audioContext.current.createGain();
    // gainNodeSub.gain.value = 1;
    // audioSourceSub
    //   .connect(gainNodeSub)
    //   .connect(gainNodeMaster.current)
    //   .connect(audioContext.current.destination);

    gsap.to(gainNodeMaster.current.gain, {
      value: 1,
      duration: 10,
    });
  };

  const playTrack = (file: number) => {
    if (!audioContext.current || !trackBufferSources.current) return;

    if (audioContext.current.state === "suspended")
      audioContext.current.resume();

    trackBufferSources.current[file].start(0);
    trackBufferSources.current[file].loop = true;
  };

  const playEffect = (file: number) => {
    if (!audioContext.current || !effectBufferSources.current) return;

    if (audioContext.current.state === "suspended")
      audioContext.current.resume();

    effectBufferSources.current[file].start(0);
  };

  const handleMute = () => {
    if (!gainNodeMaster.current) return;

    setIsMuted(!isMuted);
  };

  return (
    <WebAudioContext.Provider
      value={{
        initiateAudio,
        handleMute,
      }}
    >
      {children}
    </WebAudioContext.Provider>
  );
};

const useAudio = () => useContext(WebAudioContext);

export { AudioProvider, useAudio };
