export interface SelectedWork {
  id: number;
  slug: string;
  code: string;
  name: string;
  description: string;
  client: string;
  date: string;
  roles: string[];
  url?: string;
  video: string;
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
