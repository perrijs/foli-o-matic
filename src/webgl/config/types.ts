import { Texture, MeshMatcapMaterial } from "three";

export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface Rotation {
  x: number;
  y: number;
  z: number;
}

export interface CoilData {
  id: string;
  position: Position;
}

export interface ButtonData {
  id: string;
  position: Position;
}

export interface ItemData {
  id: string;
  object: string;
  scalar: number;
  position: Position;
  rotation: Rotation;
  slug: string;
}

export interface SpriteData {
  position: Position;
  scalar: number;
}

export interface Textures {
  id: string;
  texture: Texture;
}

export interface Matcap {
  name: string;
  matcap: MeshMatcapMaterial;
}
