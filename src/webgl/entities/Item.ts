import { DoubleSide, Group, Mesh, MeshStandardMaterial, PlaneGeometry, TextureLoader } from "three";
import gsap from "gsap";

import { AudioEffects } from "@/contexts/audioContext";

import { Scene } from "@/webgl/globals/Scene";

import { AUDIO_PLAY_EFFECT } from "@/webgl/config/topics";
import { ItemData } from "@/webgl/config/types";

export class Item {
  scene = Scene.getInstance();

  itemData: ItemData;
  mesh?: Mesh;

  constructor(itemData: ItemData) {
    this.itemData = itemData;

    this.init();
  }

  async init() {
    const textureLoader = new TextureLoader();

    const texture = await textureLoader.load(
      this.itemData.src
    );

    const geometry = new PlaneGeometry(1.44, 0.9, 1);
    const material = new MeshStandardMaterial({
      map: texture,
      side: DoubleSide,
    });
    this.mesh = new Mesh(geometry, material);
    this.mesh.scale.set(this.itemData.scalar, this.itemData.scalar, this.itemData.scalar);

    this.mesh.position.set(
      this.itemData.position.x,
      this.itemData.position.y,
      this.itemData.position.z
    );
    this.mesh.rotation.set(
      this.itemData.rotation.x,
      this.itemData.rotation.y,
      this.itemData.rotation.z
    );

    this.scene.add(this.mesh);
  }

  move() {
    if (!this.mesh) return;

    gsap.fromTo(
      this.mesh.position,
      {
        z: this.itemData.position.z,
      },
      {
        duration: 2,
        z: 2.066,
        onComplete: () => {
          this.drop();
        },
      }
    );
  }

  drop() {
    if (!this.mesh) return;
    let playedEffect = false;

    const timeline = gsap.timeline();
    timeline.fromTo(
      this.mesh.position,
      {
        y: this.mesh.position.y,
      },
      {
        duration: 0.5,
        ease: "power4.in",
        y: -2,
        onUpdate: () => {
          if (timeline.progress() > 0.8 && !playedEffect) {
            playedEffect = true;

            PubSub.publish(AUDIO_PLAY_EFFECT, AudioEffects.THUD);
          }
        },
        onComplete: () => {
          if (typeof window !== 'undefined') {
            setTimeout(() => {
              window.open(this.itemData.slug, '_blank');
            }, 333);
          }
        },
      }
    );

    gsap.fromTo(
      this.mesh.rotation,
      {
        x: this.itemData.rotation.x,
        y: this.itemData.rotation.y,
        z: this.itemData.rotation.z,
      },
      {
        duration: 0.5,
        ease: "power4.in",
        x: 0.5,
        y: 0.5,
        z: 0.5,
      }
    );
  }
}
