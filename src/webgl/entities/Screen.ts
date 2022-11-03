import { TextureLoader, PlaneGeometry, MeshBasicMaterial, Mesh } from "three";
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
    this.load();
  }

  async load() {
    const loader = new TextureLoader();

    SCREENS.forEach((screen, index) => {
      loader.load(screen.url, (texture) => {
        if (!this.textures) return;

        this.textures.push({ id: screen.id, texture: texture });

        if (index === SCREENS.length - 1) this.init();
      });
    });

    this.init();
  }

  init() {
    if (!this.textures) return;

    const screenGeometry = new PlaneGeometry(1.4, 1.4, 1.4);
    const screenMaterial = new MeshBasicMaterial({ color: 0x000000 });
    const screen = new Mesh(screenGeometry, screenMaterial);

    screen.position.set(1.633, 2.23, 3.001);

    this.mesh = screen;
    this.scene.add(this.mesh);

    this.handleSubscriptions();
  }

  handleSubscriptions() {
    PubSub.subscribe(GL_SELECT_ITEM, this.switchTexture.bind(this));
  }

  switchTexture(_topic: string, data: string) {
    if (!this.textures || !this.mesh) return;

    this.textures.forEach((texture) => {
      if (!this.mesh) return;

      if (texture.id === data) {
        const newMaterial = new MeshBasicMaterial({
          map: texture.texture,
        });
        this.mesh.material = newMaterial;
      }
    });
  }
}
