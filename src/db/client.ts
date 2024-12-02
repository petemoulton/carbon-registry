import initSqlJs from 'sql.js';
import { DB_CONFIG } from './config';
import { SCHEMA } from './schema';

let dbInstance: any = null;
let initPromise: Promise<void> | null = null;

export async function getDbInstance() {
  if (dbInstance) return dbInstance;
  if (initPromise) await initPromise;
  
  initPromise = initDb();
  await initPromise;
  return dbInstance;
}

async function initDb() {
  try {
    const SQL = await initSqlJs({
      locateFile: file => `https://sql.js.org/dist/${file}`
    });
    
    dbInstance = new SQL.Database();
    dbInstance.run(SCHEMA);
    
    // Insert sample data
    const stmt = dbInstance.prepare(`
      INSERT OR REPLACE INTO projects (
        id, name, registry, category, country, status, 
        registration_date, crediting_period, methodology,
        estimated_reduction, project_link, shapefile_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    DB_CONFIG.sampleData.forEach(project => {
      stmt.run([
        project.id,
        project.name,
        project.registry,
        project.category,
        project.country,
        project.status,
        project.registrationDate,
        project.creditingPeriod,
        project.methodology,
        project.estimatedReduction,
        project.projectLink,
        project.shapefileUrl
      ]);
    });

    stmt.free();
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}