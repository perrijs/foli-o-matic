import { BoxGeometry, MeshBasicMaterial, Mesh } from "three";

import { Scene } from "@/webgl/globals/Scene";

import { ButtonData } from "@/webgl/config/types";

export class Button {
  scene = Scene.getInstance();

  buttonData: ButtonData;

  constructor(coilData: ButtonData) {
    this.buttonData = coilData;

    this.init();
  }

  init() {
    const position = this.buttonData.position;

    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0xffff00 });
    const placeholderMesh = new Mesh(geometry, material);

    placeholderMesh.position.set(position.x, position.y, position.z);
    this.scene.add(placeholderMesh);
  }
}
