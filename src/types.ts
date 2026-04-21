import { LucideIcon } from 'lucide-react';

export interface Link {
  label: string;
  url: string;
  type: 'github' | 'download' | 'preview' | 'external';
}

export interface Collaborator {
  name: string;
  role: string;
  url?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string[]; // Array of strings for paragraphs
  imageUrl: string;
  technologies: string[];
  links?: Link[];
  collaborators?: Collaborator[];
}

export interface Education {
  year: string;
  institution: string;
  description: string;
}

export interface Profile {
  id: string;
  title: string;
  intro: string;
  themeColor: string; // Tailwind text color class (e.g. 'text-blue-600')
  bgColor: string;    // Tailwind background color class (e.g. 'bg-blue-600/10')
  icon: any;          // Lucide icon component
  projects: Project[];
  skills?: string[];
  education?: Education[];
  links?: { label: string; url: string; icon?: any }[];
}
