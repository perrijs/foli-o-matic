import { Raycaster, Vector2, Object3D, Intersection } from "three";

import { Renderer } from "./globals/Renderer";
import { Scene } from "./globals/Scene";
import { Camera } from "./globals/Camera";
import { AmbientLight } from "./globals/AmbientLight";
import { DirectionalLight } from "./globals/DirectionalLight";

import { AssetController } from "./controllers/AssetController";
import { ItemController } from "./controllers/ItemController";

export class WorldAlt {
  renderer = Renderer.getInstance();
  camera = Camera.getInstance();
  scene = Scene.getInstance();
  ambientLight: AmbientLight;
  directionalLight: DirectionalLight;

  assetController = AssetController.getInstance();
  itemController = ItemController.getInstance();

  raycaster?: Raycaster;
  pointer?: Vector2;
  intersections?: Intersection<Object3D<Event>>[];

  isZoomed?: boolean;
  canSelect?: boolean;
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

    this.itemController.getItem(0);

    this.scene.add(this.itemController.items[0].model);

    this.renderer.setAnimationLoop(() => this.render());
    this.canvasParent.appendChild(this.renderer.domElement);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
