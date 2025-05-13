import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

// Define the structure for project metadata (frontmatter)
export interface ProjectMetadata {
  title: string;
  date?: string; // Optional date for the manual
  summary?: string;
  tags?: string[];
  // Add other metadata fields as needed
}

// Define the structure for full project data, including slug and content
export interface ProjectData extends ProjectMetadata {
  slug: string;
  content: string;
}

const projectsDirectory = path.join(process.cwd(), 'src/content/project');
const supportedExtensions = ['.md']; // Assuming .md for now, can be .mdx too

// Cache for project slugs to avoid repeated filesystem operations
let cachedProjectSlugs: string[] | null = null;

// Function to get all project slugs (filenames without .md extension)
export function getAllProjectSlugs(): string[] {
  // Return cached result if available
  if (cachedProjectSlugs !== null) {
    return cachedProjectSlugs;
  }

  try {
    if (!fs.existsSync(projectsDirectory)) {
      console.warn(`Projects directory not found: ${projectsDirectory}`);
      cachedProjectSlugs = [];
      return [];
    }
    const fileNames = fs.readdirSync(projectsDirectory);
    cachedProjectSlugs = fileNames
      .filter(fileName => supportedExtensions.some(ext => fileName.endsWith(ext)))
      .map(fileName => fileName.replace(/\.(md|mdx)$/, '')); // Support .md and .mdx
    return cachedProjectSlugs;
  } catch (error) {
    console.error("Error reading projects directory:", projectsDirectory, error);
    cachedProjectSlugs = []; // Cache empty array on error
    return []; // Return empty array on error
  }
}

// Cache for project data to avoid repeated filesystem and processing operations
const projectDataCache: Record<string, ProjectData | null> = {};

// Function to get data for a single project by slug
export async function getProjectData(slug: string): Promise<ProjectData | null> {
  // Return cached result if available
  if (slug in projectDataCache) {
    return projectDataCache[slug];
  }

  let fullPath = '';
  let foundFile = false;

  for (const ext of supportedExtensions) {
    const testPath = path.join(projectsDirectory, `${slug}${ext}`);
    if (fs.existsSync(testPath)) {
      fullPath = testPath;
      foundFile = true;
      break;
    }
  }

  if (!foundFile) {
    console.warn(`Project file not found for slug: ${slug} in ${projectsDirectory}`);
    projectDataCache[slug] = null; // Cache null result
    return null;
  }

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content: rawContent } = matter(fileContents);

    const fm = data as any;
    const metadata: ProjectMetadata = {
      title: fm.title || slug, // Fallback title to slug if not provided
      date: fm.date,
      summary: fm.summary,
      tags: fm.tags,
    };

    const processedContent = await remark()
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeStringify)
      .process(rawContent);
    const contentHtml = processedContent.toString();

    const result = {
      slug,
      ...metadata,
      content: contentHtml,
    };

    projectDataCache[slug] = result; // Cache the result
    return result;
  } catch (error) {
    console.error(`Error processing project data for ${slug}:`, error);
    projectDataCache[slug] = null; // Cache null result on error
    return null;
  }
}

// Cache for sorted projects data
let cachedSortedProjectsData: Omit<ProjectData, 'content'>[] | null = null;

// Function to get all projects' basic metadata, sorted (e.g., by title or date if available)
export function getSortedProjectsData(): Omit<ProjectData, 'content'>[] {
  // Return cached result if available
  if (cachedSortedProjectsData !== null) {
    return cachedSortedProjectsData;
  }

  const slugs = getAllProjectSlugs();
  const allProjectsData = slugs
    .map(slug => {
      // Check if we already have this project in the cache
      if (slug in projectDataCache) {
        const cachedProject = projectDataCache[slug];
        if (cachedProject) {
          // Return metadata without content
          const { content, ...metadata } = cachedProject;
          return metadata;
        }
        return null;
      }

      let fullPath = '';
      let foundFile = false;
      for (const ext of supportedExtensions) {
        const testPath = path.join(projectsDirectory, `${slug}${ext}`);
        if (fs.existsSync(testPath)) {
          fullPath = testPath;
          foundFile = true;
          break;
        }
      }
      if (!foundFile) {
        projectDataCache[slug] = null; // Cache null result
        return null;
      }

      try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
        const fm = data as any;
        const metadata: ProjectMetadata = {
          title: fm.title || slug,
          date: fm.date,
          summary: fm.summary,
          tags: fm.tags,
        };
        return { slug, ...metadata };
      } catch (error) {
        console.error(`Error reading or parsing project file ${slug}:`, error);
        projectDataCache[slug] = null; // Cache null result on error
        return null;
      }
    })
    .filter(project => project !== null) as Omit<ProjectData, 'content'>[];

  // Sort projects by title (or date if you prefer and it's consistently available)
  cachedSortedProjectsData = allProjectsData.sort((a, b) => a.title.localeCompare(b.title));
  return cachedSortedProjectsData;
}
