import {
  Texture,
  DataTexture,
  TextureLoader,
  MeshMatcapMaterial,
} from "three";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

import { AUDIO_FILES } from "@/webgl/config/audio";
import { MATCAPS } from "@/webgl/config/matcaps";
import { HDRS } from "@/webgl/config/hdrs";
import { WRAPPER, COIN, COIL } from "@/webgl/config/items";
import { Matcap } from "@/webgl/config/types";

interface AudioBufferObjects {
  buffer: AudioBuffer;
  type: String;
}

export class AssetController {
  static instance: AssetController;

  gltfLoader = new GLTFLoader();
  textureLoader = new TextureLoader();
  hdrLoader = new RGBELoader();

  audioBuffers?: AudioBufferObjects[] = [];
  matcaps?: Matcap[] = [];
  hdrs?: DataTexture[] = [];
  coin?: GLTF;
  wrapper?: GLTF;
  coil?: GLTF;

  audioContext = new AudioContext();

  constructor() {}

  static getInstance() {
    if (!AssetController.instance)
      AssetController.instance = new AssetController();

    return AssetController.instance;
  }

  loadModel(url: string) {
    return new Promise<GLTF>((resolve) => {
      this.gltfLoader.load(url, resolve);
    });
  }

  loadTexture(url: string) {
    return new Promise<Texture>((resolve) => {
      this.textureLoader.load(url, resolve);
    });
  }

  loadHDR(url: string) {
    return new Promise<DataTexture>((resolve) => {
      this.hdrLoader.load(url, resolve);
    });
  }

  async loadAudio() {
    const audioBuffers = AUDIO_FILES.map(async (file) => {
      let audioBuffer;

      await fetch(`audio/${file.url}`)
        .then((response) => response.arrayBuffer())
        .then((buffer) => this.audioContext.decodeAudioData(buffer))
        .then((buffer) => {
          audioBuffer = { buffer: buffer, type: file.type };
        });

      return audioBuffer;
    });

    const audioBufferSources = (await Promise.all(
      audioBuffers
    )) as unknown as AudioBufferObjects[];
    this.audioBuffers = audioBufferSources;
  }

  async loadMatcaps() {
    const matcapsMap = MATCAPS.map(async (url) => {
      const texture = await this.loadTexture(`/textures/matcaps/${url}.webp`);

      const matcap = new MeshMatcapMaterial({ matcap: texture });

      return { name: url, matcap: matcap };
    });

    const matcaps = await Promise.all(matcapsMap);
    this.matcaps = matcaps;
  }

  async loadHDRS() {
    const hdrsMap = HDRS.map(async (hdr) => {
      const hdrTexture = await this.loadHDR(`/textures/hdr/${hdr}.hdr`);

      return hdrTexture;
    });

    const hdrs = await Promise.all(hdrsMap);
    this.hdrs = hdrs;
  }

  async loadWrapper() {
    const wrapperLoader = await this.loadModel(WRAPPER);

    const wrapper = await Promise.resolve(wrapperLoader);
    this.wrapper = wrapper;
  }

  async loadCoil() {
    const wrapperLoader = await this.loadModel(COIL);

    const coil = await Promise.resolve(wrapperLoader);
    this.coil = coil;
  }

  async loadCoin() {
    const coinLoader = await this.loadModel(COIN);

    const coin = await Promise.resolve(coinLoader);
    this.coin = coin;
  }
}
