export interface Project {
  id: string;
  name: string;
  registry: 'CER' | 'Verra' | 'Gold Standard' | 'ACR';
  category: string;
  country: string;
  status: string;
  registrationDate: string;
  creditingPeriod: string;
  methodology: string;
  estimatedReduction: number;
  projectLink: string;
  shapefileUrl: string | null;
}

export interface ProjectStats {
  totalProjects: number;
  byRegistry: Record<string, number>;
  byCategory: Record<string, number>;
  byCountry: Record<string, number>;
  byStatus: Record<string, number>;
}

export interface ApiError {
  message: string;
  status?: number;
}