// File: /home/lupin/web/jiten-portfolio/src/app/projects/[slug]/page.tsx

import { getProjectData, getAllProjectSlugs } from '@/lib/projects';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Tag } from 'lucide-react';
import { formatDate } from '@/lib/utils'; // Ensure this utility exists and works
import { Button } from '@/components/ui/button';

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Params) {
  const resolvedParams = await params;
  const project = await getProjectData(resolvedParams.slug);
  if (!project) {
    return { title: 'Project Not Found' };
  }
  return {
    title: `${project.title} | Project Documentation`,
    description: project.summary || `Documentation for the project ${project.title}`,
  };
}

export default async function ProjectPage({ params }: Params) {
  const resolvedParams = await params;
  const project = await getProjectData(resolvedParams.slug);

  if (!project) {
    notFound(); // This will render a 404 page if the project markdown isn't found
  }

  return (
    <section className="pt-28 pb-24 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-foreground/70 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <article className="prose-zinc dark:prose-invert lg:prose-xl mx-auto bg-card p-6 sm:p-8 rounded-lg shadow-lg border border-primary/20">
          <header className="mb-8 border-b border-border pb-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 flex items-center">
              <BookOpen className="mr-3 h-8 w-8 text-primary" />
              {project.title}
            </h1>
            {project.date && ( // Conditionally render date if available
              <p className="text-sm text-foreground/70">
                Last updated: {formatDate(project.date)}
              </p>
            )}
            {project.summary && ( // Conditionally render summary if available
              <p className="mt-2 text-lg text-foreground/80">
                {project.summary}
              </p>
            )}
          </header>
          
          {/* This will render the HTML content from your Markdown file */}
          <div dangerouslySetInnerHTML={{ __html: project.content }} />

          {project.tags && project.tags.length > 0 && (
            <footer className="mt-12 pt-6 border-t border-border">
              <h3 className="text-lg font-semibold mb-3 text-foreground/90">Related Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center text-xs py-1 px-3 rounded-full bg-primary/10 text-primary font-mono"
                  >
                    <Tag className="mr-1.5 h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </footer>
          )}
        </article>

        <div className="mt-8 flex justify-center">
            <Button asChild variant="ghost" size="sm" className="group border border-primary/20 hover:bg-primary/4">
                <Link href="/" className="inline-flex items-center text-sm text-foreground/70 hover:text-primary transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to all Project
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}