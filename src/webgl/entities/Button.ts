import { BoxGeometry, MeshBasicMaterial, Mesh } from "three";

import { Scene } from "@/webgl/globals/Scene";

import { ButtonData } from "@/webgl/config/types";

export class Button {
  scene = Scene.getInstance();

  buttonData: ButtonData;

  constructor(buttonData: ButtonData) {
    this.buttonData = buttonData;

    this.init();
  }

  init() {
    const position = this.buttonData.position;

    const geometry = new BoxGeometry(0.3, 0.3, 0.3);
    const material = new MeshBasicMaterial({ color: 0xffffff });
    const placeholderMesh = new Mesh(geometry, material);

    placeholderMesh.name = this.buttonData.id;
    placeholderMesh.position.set(position.x, position.y, position.z);
    this.scene.add(placeholderMesh);
  }
}
