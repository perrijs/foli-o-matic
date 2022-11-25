import { Raycaster, Vector2, Object3D, Intersection, Mesh, Group } from "three";

import { Renderer } from "./globals/Renderer";
import { Scene } from "./globals/Scene";
import { Camera } from "./globals/Camera";
import { AmbientLight } from "./globals/AmbientLight";
import { DirectionalLight } from "./globals/DirectionalLight";

import { AssetController } from "./controllers/AssetController";
import { ItemController } from "./controllers/ItemController";
import { GL_SET_MODEL } from "./config/topics";

export class WorldAlt {
  renderer = Renderer.getInstance();
  camera = Camera.getInstance();
  scene = Scene.getInstance();
  ambientLight: AmbientLight;
  directionalLight: DirectionalLight;

  assetController = AssetController.getInstance();
  itemController = ItemController.getInstance();
  model?: Group;

  raycaster?: Raycaster;
  pointer?: Vector2;
  intersections?: Intersection<Object3D<Event>>[];
  modelRotation = 0;

  canvasParent: HTMLDivElement;

  constructor(canvasParent: HTMLDivElement) {
    this.ambientLight = new AmbientLight();
    this.directionalLight = new DirectionalLight();

    this.canvasParent = canvasParent;

    this.init();
  }

  async init() {
    if (!this.itemController.items) return;

    document.body.style.height = "100vh";

    this.renderer.setAspectRatio(this.canvasParent);
    this.camera.setAspectRatio(this.canvasParent);

    this.scene.cleanup();

    this.scene.add(this.ambientLight);
    this.scene.add(this.directionalLight);

    this.camera.position.set(0, 0, 1);
    this.camera.lookAt(0, 0, 0);

    this.renderer.setAnimationLoop(() => this.render());
    this.canvasParent.appendChild(this.renderer.domElement);

    PubSub.subscribe(GL_SET_MODEL, (_topic, data) => this.setModel(data));
  }

  setModel(index: number) {
    if (!this.itemController.items) return;

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
