import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import { addProject, logScraping } from '../src/db/index.js';

async function scrapeVerra() {
  const registryId = 'VERRA';
  try {
    logScraping(registryId, 'in_progress');
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Navigate to Verra registry
    await page.goto('https://registry.verra.org/app/search/VCS');
    
    // Wait for project list to load
    await page.waitForSelector('.project-list');
    
    const content = await page.content();
    const $ = cheerio.load(content);
    
    const projects = [];
    
    $('.project-item').each((_, element) => {
      const project = {
        id: $(element).find('.project-id').text().trim(),
        name: $(element).find('.project-name').text().trim(),
        category: $(element).find('.project-type').text().trim(),
        country: $(element).find('.project-country').text().trim(),
        methodology: $(element).find('.methodology-id').text().trim(),
        estimatedReduction: parseInt($(element).find('.estimated-reduction').text().replace(/,/g, ''), 10),
        status: 'Active',
        registrationDate: new Date().toISOString().split('T')[0],
        projectLink: `https://registry.verra.org/app/projectDetail/VCS/${$(element).find('.project-id').text().trim()}`
      };
      
      projects.push(project);
    });
    
    // Add projects to database
    projects.forEach(project => {
      addProject({
        ...project,
        registry_id: registryId
      });
    });
    
    await browser.close();
    
    logScraping(registryId, 'success', projects.length);
  } catch (error) {
    console.error('Error scraping Verra:', error);
    logScraping(registryId, 'failed', 0, error.message);
  }
}

async function main() {
  try {
    await scrapeVerra();
    console.log('Scraping completed successfully');
  } catch (error) {
    console.error('Error during scraping:', error);
  }
}

main();