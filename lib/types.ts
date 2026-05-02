export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export type Service = {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  body: string;
  features: string[];
  href: string;
  image: string;
  imageAlt: string;
};

export type NewsItem = {
  date: string;
  category: string;
  title: string;
  href: string;
};

export type ValueItem = {
  no: string;
  label: string;
  title: string;
  body: string;
};
