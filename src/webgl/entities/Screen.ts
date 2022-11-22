import {
  TextureLoader,
  VideoTexture,
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
  MeshStandardMaterial,
  LinearFilter,
  sRGBEncoding,
} from "three";
import PubSub from "pubsub-js";

import { Scene } from "@/webgl/globals/Scene";

import { GL_SELECT_ITEM } from "@/webgl/config/topics";
import { Textures } from "@/webgl/config/types";

export class Screen {
  scene = Scene.getInstance();

  textures?: Textures[] = [];
  mesh?: Mesh;

  constructor() {
    this.init();
  }

  init() {
    if (!this.textures) return;

    const screenGeometry = new PlaneGeometry(1.4, 0.4, 1);
    const screenMaterial = new MeshBasicMaterial({ color: 0x33312e });
    const screen = new Mesh(screenGeometry, screenMaterial);

    screen.position.set(1.633, 1.6, 3.002);

    this.mesh = screen;
    this.scene.add(this.mesh);
  }
}
