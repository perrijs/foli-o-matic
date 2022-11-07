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

import { SCREENS } from "@/webgl/config/screens";
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
    const screenMaterial = new MeshBasicMaterial({ color: 0x000000 });
    const screen = new Mesh(screenGeometry, screenMaterial);

    screen.position.set(1.633, 1.7, 3.002);

    this.mesh = screen;
    this.scene.add(this.mesh);

    this.handleSubscriptions();
  }

  handleSubscriptions() {
    PubSub.subscribe(GL_SELECT_ITEM, this.switchTexture.bind(this));
  }

  switchTexture(_topic: string, data: string) {
    SCREENS.forEach((screen) => {
      if (!this.mesh) return;

      if (screen.id === data) {
        const videoElement = document.getElementById(
          screen.videoId
        ) as HTMLVideoElement;

        if (videoElement) {
          const texture = new VideoTexture(videoElement);
          texture.magFilter = LinearFilter;
          texture.encoding = sRGBEncoding;

          this.mesh.material = new MeshStandardMaterial({
            map: texture,
          });
        }

        videoElement.play();
      }
    });
  }
}
