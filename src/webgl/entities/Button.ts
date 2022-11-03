import {
  Texture,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  MeshMatcapMaterial,
} from "three";

import { Scene } from "@/webgl/globals/Scene";

import { ButtonData } from "@/webgl/config/types";

export class Button {
  scene = Scene.getInstance();

  buttonData: ButtonData;
  matcap: Texture;

  constructor(buttonData: ButtonData, matcap: Texture) {
    this.buttonData = buttonData;
    this.matcap = matcap;

    this.init();
  }

  init() {
    if (!this.matcap) return;

    const position = this.buttonData.position;

    const geometry = new BoxGeometry(0.35, 0.35, 0.35);
    const material = new MeshMatcapMaterial({ matcap: this.matcap });
    const placeholderMesh = new Mesh(geometry, material);

    placeholderMesh.name = this.buttonData.id;
    placeholderMesh.position.set(position.x, position.y, position.z);
    this.scene.add(placeholderMesh);
  }
}
