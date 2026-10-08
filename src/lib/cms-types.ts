export type Competency = { title: string; desc: string; icon?: string };
export type Job = {
  role: string; company: string; location: string; period: string;
  logo: string; summary: string; bullets: string[]; tags: string[];
  highlight?: string[]; clientsLine?: string; images?: string[];
};
export type ClientItem = { name: string; logo?: string; isSimple?: boolean };
export type StatItem = { value: number; suffix: string; label: string };
export type Project = {
  title: string; category: string; year: string; description: string;
  color: string; initial: string; href: string; image?: string;
};
export type Testimonial = { name: string; role: string; text: string; avatarColor: string; avatarImage?: string };
export type CmsData = {
  site: { title: string; description: string };
  hero: {
    badge: string; greeting?: string; name: string; role: string; about: string;
    shippedLabel: string; shippedValue: string; brands: string[]; linkedin?: string;
    photo: string; photoBadge: string; location: string;
  };
  competencies: { eyebrow: string; titleA: string; titleAccent: string; desc: string; items: Competency[] };
  experience: { eyebrow: string; titleA: string; titleAccent: string; note: string; jobs: Job[] };
  clients: { eyebrow: string; note: string; items: ClientItem[] };
  stats: StatItem[];
  portfolio: { eyebrow: string; titleA: string; titleAccent: string; filters: string[]; projects: Project[] };
  process: { eyebrow: string; title: string; desc: string; steps: { title: string; items: string[] }[] };
  skills: {
    eyebrow: string; titleA: string; titleAccent: string; desc: string;
    years: string; yearsDesc: string; checklist: string[]; tools: { name: string; level: number }[];
  };
  testimonials: Testimonial[];
  faq: { question: string; answer: string }[];
  contact: {
    eyebrow: string; titleA: string; titleAccent: string; desc: string;
    email: string; phone: string; location: string; categories: string[];
  };
  footer: { name: string; desc: string; email: string; copyright: string; columns: { title: string; links: string[] }[] };
};
