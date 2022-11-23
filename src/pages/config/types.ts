export interface SelectedWork {
  id: number;
  slug: string;
  code: string;
  name: string;
  client: string;
  date: string;
  color: string;
  image: string;
  video: string;
  description: string;
  roles: string[];
  url?: string;
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