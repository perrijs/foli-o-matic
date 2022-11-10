export interface SelectedWork {
  id: number;
  slug: string;
  code: string;
  name: string;
  client: string;
  date: string;
  images: CarouselImage[];
  roles: string[];
}

export interface OtherWork {
  name: string;
  url: string;
  code: string;
  client: string;
  date: string;
}

export interface Award {
  name: string;
  url: string;
  code: string;
  organisation: string;
  year: string;
}

export interface CarouselImage {
  url: string;
  aspectRatio: number;
  width: number;
}
