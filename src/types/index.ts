export interface Project {
  id: string;
  name: string;
  registry: 'CER' | 'Gold Standard' | 'Verra';
  category: string;
  country: string;
  status: string;
  registrationDate: string;
  creditingPeriod?: string;
  methodology?: string;
  estimatedReduction?: number;
  projectLink: string;
  shapefileUrl?: string;
}

export interface ProjectStats {
  totalProjects: number;
  byRegistry: Record<string, number>;
  byCategory: Record<string, number>;
  byCountry: Record<string, number>;
  byStatus: Record<string, number>;
}