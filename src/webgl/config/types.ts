import { Texture, MeshMatcapMaterial } from "three";

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface CoilData {
  id: number;
  position: Vec3;
}

export interface ButtonData {
  key_value: string;
  position: Vec3;
}

export interface ItemData {
  id: number;
  item_code: string;
  object: string;
  scalar: number;
  position: Vec3;
  rotation: Vec3;
  slug: string;
}

export interface CardData {
  position: Vec3;
  rotation: Vec3;
}

export interface Textures {
  id: string;
  texture: Texture;
}

export interface Matcap {
  name: string;
  matcap: MeshMatcapMaterial;
}
