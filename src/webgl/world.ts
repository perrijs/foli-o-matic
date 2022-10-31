import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import PubSub from "pubsub-js";

import { Renderer } from "./globals/Renderer";
import { Scene } from "./globals/Scene";
import { Camera } from "./globals/Camera";
import { AmbientLight } from "./globals/AmbientLight";

import { CoilController } from "./controllers/CoilController";

import { GL_EXAMPLE_TOPIC } from "./config/topics";

export class World {
  renderer = Renderer.getInstance();
  scene = Scene.getInstance();
  camera = Camera.getInstance();
  ambientLight = AmbientLight.getInstance();

  coilController = CoilController.getInstance();

  controls?: OrbitControls;

  canvasParent: HTMLDivElement;

  constructor(canvasParent: HTMLDivElement) {
    this.canvasParent = canvasParent;

    this.handleSubscriptions();
    this.init();
  }

  init() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.camera.position.set(0, 0, 5);
    this.controls.update();

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
    this.controls?.update();

    this.renderer.render(this.scene, this.camera);
  }
}
