import Database from 'better-sqlite3';

const db = new Database("database/carbon");

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create tables
db.exec(`
  -- Registries table
  CREATE TABLE IF NOT EXISTS registries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    website TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Categories table
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Countries table
  CREATE TABLE IF NOT EXISTS countries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    iso_code TEXT UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Projects table
  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    registry_id TEXT NOT NULL,
    name TEXT NOT NULL,
    category_id INTEGER,
    country_id INTEGER,
    status TEXT CHECK(status IN ('Active', 'Pending', 'Completed', 'Suspended')),
    registration_date DATE,
    crediting_period TEXT,
    methodology TEXT,
    estimated_reduction INTEGER,
    project_link TEXT,
    shapefile_url TEXT,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (registry_id) REFERENCES registries(id),
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (country_id) REFERENCES countries(id)
  );

  -- Scraping logs table
  CREATE TABLE IF NOT EXISTS scraping_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    registry_id TEXT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME,
    status TEXT CHECK(status IN ('success', 'failed', 'in_progress')),
    projects_updated INTEGER DEFAULT 0,
    error_message TEXT,
    FOREIGN KEY (registry_id) REFERENCES registries(id)
  );
`);

// Insert initial registry data
const registries = [
  { id: 'CER', name: 'Clean Energy Regulator', website: 'https://www.cleanenergyregulator.gov.au/' },
  { id: 'VERRA', name: 'Verra', website: 'https://verra.org/' },
  { id: 'GS', name: 'Gold Standard', website: 'https://www.goldstandard.org/' },
  { id: 'ACR', name: 'American Carbon Registry', website: 'https://americancarbonregistry.org/' }
];

const insertRegistry = db.prepare('INSERT OR IGNORE INTO registries (id, name, website) VALUES (?, ?, ?)');
registries.forEach(registry => {
  insertRegistry.run(registry.id, registry.name, registry.website);
});

console.log('Database initialized successfully!');