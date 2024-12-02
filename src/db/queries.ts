import type { Project } from '../types';
import { getDbInstance } from './client';

export async function getAllProjects(): Promise<Project[]> {
  const db = await getDbInstance();
  
  const results = db.exec(`
    SELECT 
      id,
      name,
      registry,
      category,
      country,
      status,
      registration_date as registrationDate,
      crediting_period as creditingPeriod,
      methodology,
      estimated_reduction as estimatedReduction,
      project_link as projectLink,
      shapefile_url as shapefileUrl
    FROM projects
    ORDER BY registration_date DESC
  `);

  if (!results.length) return [];

  return results[0].values.map((row: any[]) => ({
    id: row[0],
    name: row[1],
    registry: row[2] as Project['registry'],
    category: row[3],
    country: row[4],
    status: row[5],
    registrationDate: row[6],
    creditingPeriod: row[7],
    methodology: row[8],
    estimatedReduction: row[9],
    projectLink: row[10],
    shapefileUrl: row[11]
  }));
}