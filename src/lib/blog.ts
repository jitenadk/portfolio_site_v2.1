import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

// Define the structure for blog post metadata (frontmatter)
export interface PostMetadata {
  title: string;
  date: string; // Keep as string for simplicity, parsing/formatting can happen in components
  summary: string;
  tags?: string[];
  featuredImage?: string; // Path to the featured image
  imageAlt?: string; // Alt text for the featured image
  // Add other metadata fields as needed
}

// Define the structure for a full blog post, including slug and content
// MDX imports are handled by next-mdx-remote/rsc in the page component

export interface PostData extends PostMetadata {
  slug: string;
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'src/content/blog');
const supportedExtensions = ['.md'];

// Function to get all post slugs (filenames without .md extension)
export function getAllPostSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter(fileName => supportedExtensions.some(ext => fileName.endsWith(ext)))
      .map(fileName => fileName.replace(/\.md$/, ''));
  } catch (error) {
    console.error("Error reading posts directory:", postsDirectory, error);
    return []; // Return empty array on error
  }
}

// Function to get data for a single post by slug
export async function getPostData(slug: string): Promise<PostData | null> {
  const mdPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(mdPath)) {
    console.warn(`Post file not found for slug: ${slug}`);
    return null;
  }
  const fileContents = fs.readFileSync(mdPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const { data, content: rawContent } = matter(fileContents);

  // Map frontmatter: use excerpt if present for summary
  const fm = data as any;
  const metadata: PostMetadata = {
    title: fm.title,
    date: fm.date,
    summary: fm.excerpt ?? fm.summary,
    tags: fm.tags,
    featuredImage: fm.featuredImage,
    imageAlt: fm.imageAlt || fm.title,
  };

  // For MD, process markdown to HTML
  const processedContent = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(rawContent);
  const contentHtml = processedContent.toString();
  return { slug, ...metadata, content: contentHtml };

}

// Alias to support old name
export const getPostById = getPostData;

// Function to get all posts, sorted by date (newest first)
export function getSortedPostsData(): Omit<PostData, 'content'>[] {
  const slugs = getAllPostSlugs();
  const allPostsData = slugs
    .map(slug => {
      const fullPath = path.join(postsDirectory, `${slug}.md`);
      try {
        if (!fs.existsSync(fullPath)) return null;
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
        // Map frontmatter: use excerpt if present for summary
        const fm = data as any;
        const metadata: PostMetadata = {
          title: fm.title,
          date: fm.date,
          summary: fm.excerpt ?? fm.summary,
          tags: fm.tags,
          featuredImage: fm.featuredImage,
          imageAlt: fm.imageAlt || fm.title,
        };
        return { slug, ...metadata }; // Only return metadata and slug
      } catch (error) {
        console.error(`Error reading post metadata for slug: ${slug}`, error);
        return null;
      }
    })
    .filter((post): post is Omit<PostData, 'content'> => post !== null); // Filter out nulls and update type

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}