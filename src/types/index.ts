
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  categories: string[];
  link: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  link: string;
  citationCount: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  email: string;
  publications: number;
  website: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: string;
  registrationLink?: string;
  recordingLink?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
