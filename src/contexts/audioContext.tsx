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

export enum AudioEffects {
  BEEP,
  CIRCUIT_BREAKER,
  COIN_FLIP,
  COIN_SLOT,
  DENIED,
  SUCCESS,
  THUD,
  WHIRR,
}

export enum AudioTracks {
  ELEVATOR_MUSIC,
  HUM,
}

const AudioProvider = ({ children }: ProviderProps) => {
  const audioContext = useRef<AudioContext>();
  const gainNodeMaster = useRef<GainNode | null>(null);
  const gainNodeTrack = useRef<GainNode | null>(null);
  const gainNodeEffect = useRef<GainNode | null>(null);
  const trackBuffers = useRef<AudioBuffer[]>([]);
  const effectBuffers = useRef<AudioBuffer[]>([]);

  const [isMuted, setIsMuted] = useState(false);

  const handleSubscriptions = useCallback(() => {
    PubSub.subscribe(AUDIO_PLAY_TRACK, (_message, data) => playTrack(data));
    PubSub.subscribe(AUDIO_PLAY_EFFECT, (_message, data) => playEffect(data));
  }, []);

  const initiateAudio = () => {
    handleSubscriptions();

    const assetController = AssetController.getInstance();

    audioContext.current = assetController.audioContext;

    gainNodeMaster.current = audioContext.current.createGain();
    gainNodeMaster.current.gain.value = 0;

    gainNodeTrack.current = audioContext.current.createGain();
    gainNodeTrack.current.gain.value = 0.25;

    gainNodeEffect.current = audioContext.current.createGain();
    gainNodeEffect.current.gain.value = 1;

    const audioBuffers = assetController.audioBuffers;
    if (audioBuffers) {
      audioBuffers.forEach((audioBuffer) => {
        if (!audioContext.current) return;

        const { buffer, type } = audioBuffer;

        if (type === "track") {
          trackBuffers.current.push(buffer);
        } else {
          effectBuffers.current.push(buffer);
        }
      });
    }

    gsap.to(gainNodeMaster.current.gain, {
      value: 1,
      duration: 10,
    });
  };

  const playTrack = (index: number) => {
    if (!audioContext.current || !trackBuffers.current) return;

    const bufferSource = audioContext.current.createBufferSource();
    bufferSource.buffer = trackBuffers.current[index];

    if (gainNodeMaster.current && gainNodeTrack.current) {
      bufferSource
        .connect(gainNodeTrack.current)
        .connect(gainNodeMaster.current)
        .connect(audioContext.current.destination);

      bufferSource.start(0);
      bufferSource.loop = true;
    }
  };

  const playEffect = (index: number) => {
    if (!audioContext.current || !effectBuffers.current) return;

    const bufferSource = audioContext.current.createBufferSource();
    bufferSource.buffer = effectBuffers.current[index];

    if (gainNodeMaster.current && gainNodeEffect.current) {
      bufferSource
        .connect(gainNodeEffect.current)
        .connect(gainNodeMaster.current)
        .connect(audioContext.current.destination);

      bufferSource.start(0);
    }
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
