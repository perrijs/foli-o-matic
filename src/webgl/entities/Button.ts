import { BoxGeometry, MeshMatcapMaterial, Mesh } from "three";
import gsap from "gsap";

import { Scene } from "@/webgl/globals/Scene";

import { ButtonData } from "@/webgl/config/types";

export class Button {
  scene = Scene.getInstance();

  buttonData: ButtonData;
  mesh?: Mesh;
  matcap?: MeshMatcapMaterial;

  constructor(buttonData: ButtonData, matcap: MeshMatcapMaterial) {
    this.buttonData = buttonData;
    this.matcap = matcap;

    this.init();
  }

  init() {
    const position = this.buttonData.position;

    const geometry = new BoxGeometry(0.35, 0.35, 0.35);

    const material = this.matcap;

    const mesh = new Mesh(geometry, material);

    mesh.name = this.buttonData.id;
    mesh.position.set(position.x, position.y, position.z);

    this.mesh = mesh;
    this.scene.add(this.mesh);
  }

  press() {
    if (!this.mesh) return;

    gsap.fromTo(
      this.mesh.position,
      {
        z: 2.9,
      },
      {
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        z: 2.85,
      }
    );
  }
}
