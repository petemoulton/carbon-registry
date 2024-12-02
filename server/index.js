import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';

const app = express();
const port = 10001;
const db = new Database('/path/to/database.db');

// Initialize database with sample project
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    name TEXT,
    registry TEXT,
    category TEXT,
    country TEXT,
    status TEXT,
    registration_date TEXT,
    crediting_period TEXT,
    methodology TEXT,
    estimated_reduction INTEGER,
    project_link TEXT,
    shapefile_url TEXT
  )
`);

// Insert sample project
const sampleProject = {
  id: 'ERF101857',
  name: 'Avoided Deforestation Project 1',
  registry: 'CER',
  category: 'Avoided Deforestation',
  country: 'Australia',
  status: 'Active',
  registration_date: '2023-06-30',
  crediting_period: '25 years',
  methodology: 'Avoided Deforestation 1.1',
  estimated_reduction: 124000,
  project_link: 'https://cer.gov.au/schemes/australian-carbon-credit-unit-scheme/accu-project-and-contract-register/project/ERF101857',
  shapefile_url: null
};

const insertProject = db.prepare(`
  INSERT OR REPLACE INTO projects (
    id, name, registry, category, country, status, registration_date,
    crediting_period, methodology, estimated_reduction, project_link, shapefile_url
  ) VALUES (
    @id, @name, @registry, @category, @country, @status, @registration_date,
    @crediting_period, @methodology, @estimated_reduction, @project_link, @shapefile_url
  )
`);

insertProject.run(sampleProject);

app.use(cors());
app.use(express.json());

app.get('/api/projects', (_, res) => {
  try {
    const projects = db.prepare('SELECT * FROM projects').all();
    res.json(projects);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.get('/api/stats', (_, res) => {
  try {
    const stats = {
      totalProjects: db.prepare('SELECT COUNT(*) as count FROM projects').get().count,
      byRegistry: db.prepare('SELECT registry, COUNT(*) as count FROM projects GROUP BY registry').all()
        .reduce((acc, { registry, count }) => ({ ...acc, [registry]: count }), {}),
      byCategory: db.prepare('SELECT category, COUNT(*) as count FROM projects GROUP BY category').all()
        .reduce((acc, { category, count }) => ({ ...acc, [category]: count }), {}),
      byCountry: db.prepare('SELECT country, COUNT(*) as count FROM projects GROUP BY country').all()
        .reduce((acc, { country, count }) => ({ ...acc, [country]: count }), {}),
      byStatus: db.prepare('SELECT status, COUNT(*) as count FROM projects GROUP BY status').all()
        .reduce((acc, { status, count }) => ({ ...acc, [status]: count }), {})
    };
    res.json(stats);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});