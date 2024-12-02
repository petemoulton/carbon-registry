import Database from 'sql.js';

const db = new Database("/database/carbon");

export function getProjects() {
  const query = `
    SELECT 
      p.id,
      p.name,
      r.id as registry,
      c.name as category,
      co.name as country,
      p.status,
      p.registration_date as registrationDate,
      p.crediting_period as creditingPeriod,
      p.methodology,
      p.estimated_reduction as estimatedReduction,
      p.project_link as projectLink,
      p.shapefile_url as shapefileUrl
    FROM projects p
    JOIN registries r ON p.registry_id = r.id
    JOIN categories c ON p.category_id = c.id
    JOIN countries co ON p.country_id = co.id
    ORDER BY p.registration_date DESC
  `;

  return db.prepare(query).all();
}

export function getProjectStats() {
  const projects = getProjects();
  
  return {
    totalProjects: projects.length,
    byRegistry: projects.reduce((acc, project) => {
      acc[project.registry] = (acc[project.registry] || 0) + 1;
      return acc;
    }, {}),
    byCategory: projects.reduce((acc, project) => {
      acc[project.category] = (acc[project.category] || 0) + 1;
      return acc;
    }, {}),
    byCountry: projects.reduce((acc, project) => {
      acc[project.country] = (acc[project.country] || 0) + 1;
      return acc;
    }, {}),
    byStatus: projects.reduce((acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1;
      return acc;
    }, {})
  };
}

export function addProject(project) {
  const stmt = db.prepare(`
    INSERT INTO projects (
      id, registry_id, name, category_id, country_id, 
      status, registration_date, crediting_period,
      methodology, estimated_reduction, project_link, shapefile_url
    ) VALUES (
      @id, @registry_id, @name, @category_id, @country_id,
      @status, @registration_date, @crediting_period,
      @methodology, @estimated_reduction, @project_link, @shapefile_url
    )
    ON CONFLICT(id) DO UPDATE SET
      name = @name,
      category_id = @category_id,
      country_id = @country_id,
      status = @status,
      crediting_period = @crediting_period,
      methodology = @methodology,
      estimated_reduction = @estimated_reduction,
      project_link = @project_link,
      shapefile_url = @shapefile_url,
      last_updated = CURRENT_TIMESTAMP
  `);

  stmt.run(project);
}

export function logScraping(
  registryId, 
  status,
  projectsUpdated = 0,
  errorMessage
) {
  const stmt = db.prepare(`
    INSERT INTO scraping_logs (
      registry_id, start_time, end_time, status, projects_updated, error_message
    ) VALUES (?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?, ?, ?)
  `);

  stmt.run(registryId, status, projectsUpdated, errorMessage);
}