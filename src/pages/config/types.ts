export interface SelectedWork {
  id: number;
  slug: string;
  type?: string;
  name: string;
  client: string;
  date: string;
  color: string;
}

export interface OtherWork {
  name: string;
  url?: string;
  type?: string;
  client: string;
  date: string;
}

export interface Award {
  name: string;
  url?: string;
  type?: string;
  organisation?: string;
  year: string;
}
