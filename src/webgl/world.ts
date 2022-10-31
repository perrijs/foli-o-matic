import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";
import PubSub from "pubsub-js";

import { Renderer } from "./globals/Renderer";
import { Scene } from "./globals/Scene";
import { Camera } from "./globals/Camera";

import { GL_EXAMPLE_TOPIC } from "./config/topics";

export class World {
  renderer = Renderer.getInstance();
  scene = Scene.getInstance();
  camera = Camera.getInstance();

  canvasParent: HTMLDivElement;

  constructor(canvasParent: HTMLDivElement) {
    this.canvasParent = canvasParent;

    this.handleSubscriptions();
    this.init();
  }

  init() {
    this.camera.position.set(0, 0, 5);

    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0x000000 });
    const cube = new Mesh(geometry, material);
    this.scene.add(cube);

    this.renderer.setAnimationLoop(() => this.render());
    this.canvasParent.appendChild(this.renderer.domElement);

    PubSub.publish(GL_EXAMPLE_TOPIC, "Pub/Sub works!");
  }

  handleSubscriptions() {
    PubSub.subscribe(GL_EXAMPLE_TOPIC, this.exampleSubscriber);
  }

  exampleSubscriber(_topic: string, data: string) {
    console.log(data);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
