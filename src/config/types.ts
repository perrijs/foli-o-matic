export interface SelectedWork {
  id: number;
  href: string;
  code: string;
  name: string;
  client: string;
  date: string;
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
