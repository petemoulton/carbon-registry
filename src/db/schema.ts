export const SCHEMA = `
  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    registry TEXT NOT NULL,
    category TEXT NOT NULL,
    country TEXT NOT NULL,
    status TEXT NOT NULL,
    registration_date TEXT NOT NULL,
    crediting_period TEXT,
    methodology TEXT,
    estimated_reduction INTEGER,
    project_link TEXT NOT NULL,
    shapefile_url TEXT
  );
`;