import { Group } from "three";

import { Renderer } from "@/webgl/globals/Renderer";
import { Scene } from "@/webgl/globals/Scene";
import { Camera } from "@/webgl/globals/Camera";
import { AmbientLight } from "@/webgl/globals/AmbientLight";
import { DirectionalLight } from "@/webgl/globals/DirectionalLight";

import { AssetController } from "@/webgl/controllers/AssetController";
import { ItemController } from "@/webgl/controllers/ItemController";
import {
  GL_SET_MODEL,
  LOAD_COMPLETE,
  UI_HANDLE_TRANSITION,
} from "@/webgl/config/topics";

export class SingleItem {
  assetController = AssetController.getInstance();

  renderer: Renderer;
  camera: Camera;
  scene: Scene;
  ambientLight: AmbientLight;
  directionalLight: DirectionalLight;

  itemController?: ItemController;
  model?: Group;
  canvasParent: HTMLDivElement;

  modelRotation = 0;

  constructor(canvasParent: HTMLDivElement) {
    this.renderer = new Renderer();
    this.camera = new Camera();
    this.scene = new Scene();
    this.ambientLight = new AmbientLight();
    this.directionalLight = new DirectionalLight();
    this.itemController = new ItemController(this.scene);

    this.canvasParent = canvasParent;

    this.handleSubscriptions();
    this.init();
  }

  init() {
    if (!this.assetController.models) return;

    this.renderer.setAspectRatio(this.canvasParent);
    this.camera.setAspectRatio(this.canvasParent);

    this.scene.cleanup();

    this.scene.add(this.ambientLight);
    this.scene.add(this.directionalLight);

    this.camera.position.set(0, 0, 1);
    this.camera.lookAt(0, 0, 0);

    this.renderer.setAnimationLoop(() => this.render());
    this.canvasParent.appendChild(this.renderer.domElement);
  }

  handleSubscriptions() {
    PubSub.subscribe(LOAD_COMPLETE, () => this.init());
    PubSub.subscribe(GL_SET_MODEL, (_topic, data) => this.setModel(data));
    PubSub.subscribe(UI_HANDLE_TRANSITION, () =>
      this.renderer.setAnimationLoop(null)
    );
  }

  setModel(index: number) {
    if (!this.itemController || !this.itemController.items) return;

    this.scene.traverse((child) => {
      if (child instanceof Group) {
        this.scene.remove(child);
      }
    });

    if (index <= this.itemController.items.length - 1) {
      this.itemController.getItem(index);
      this.model = this.itemController.items[index].model;

      this.scene.add(this.model);
    }
  }

  render() {
    if (!this.model) return;

    this.modelRotation -= 0.01;
    this.model.rotation.y = this.modelRotation;

    this.renderer.render(this.scene, this.camera);
  }
}
