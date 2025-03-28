import { Mesh, MeshBasicMaterial, PlaneGeometry } from "three";
import gsap from "gsap";

import { Scene } from "@/webgl/globals/Scene";

export class Background {
  scene = Scene.getInstance();

  mesh?: Mesh;

  constructor() {
    this.init();
  }


  init() {
    const geometry = new PlaneGeometry(1000, 1000);
    const material = new MeshBasicMaterial({
      color: "#000000",
      transparent: true,
      opacity: 0,
    });
    const mesh = new Mesh(geometry, material);

    mesh.position.set(0, 0, -1);
    mesh.rotation.x = 0;

    this.mesh = mesh;
    this.scene.add(this.mesh);
  }

  display(isVisible: boolean) {
    if (!this.mesh) return;

    gsap.to(this.mesh.position, {
      z: isVisible ? 6 : -1,
      delay: 2.5,
      duration: 0,
    });

    gsap.to(this.mesh.material, {
      opacity: isVisible ? 0.66 : 0,
      delay: isVisible ? 2.5 : 0,
      duration: 1,
    });
  }
}
