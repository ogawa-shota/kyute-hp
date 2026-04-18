export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export type Testimonial = {
  id: string;
  headline: string;
  school: string;
  faculty: string;
  profile: string;
  body: string;
};

export type WhyPoint = {
  title: string;
  subtitle: string;
  body: string;
  href?: string;
  linkLabel?: string;
};
