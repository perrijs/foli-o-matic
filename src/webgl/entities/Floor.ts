import {
  Color,
  DoubleSide,
  Material,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  PlaneGeometry,
  ShadowMaterial,
} from "three";

import { Scene } from "@/webgl/globals/Scene";
import { GL_ACTIVATE_LIGHTS } from "../config/topics";

export class Floor {
  scene: Scene;
  mesh?: Mesh;

  constructor(scene: Scene) {
    this.scene = scene;

    this.handleSubscriptions();
    this.init();
  }

  handleSubscriptions() {
    PubSub.subscribe(GL_ACTIVATE_LIGHTS, () => this.switchMaterial());
  }

  init() {
    const geometry = new PlaneGeometry(1000, 1000);
    const material = new MeshPhongMaterial({
      color: "#080808",
      side: DoubleSide,
    });
    const mesh = new Mesh(geometry, material);

    mesh.position.set(0, -4, 0);
    mesh.rotation.x = Math.PI / 2;
    mesh.receiveShadow = true;

    this.mesh = mesh;
    this.scene.add(this.mesh);
  }

  switchMaterial() {
    if (!this.mesh) return;

    this.mesh.material = new ShadowMaterial({
      opacity: 0.5,
      side: DoubleSide,
    });
  }
}
