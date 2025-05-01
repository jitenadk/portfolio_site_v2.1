import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import { getPostById } from "@/lib/blog";

// Removed blog CSS import, inlining Tailwind classes

type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Params) {
  const post = await getPostById(params.slug);

  if (!post) {
    return {
      title: "Post Not Found | jitendotexe",
      description: "The blog post you're looking for doesn't exist.",
    };
  }

  return {
    title: `${post.title} | jitendotexe`,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: Params) {
  const post = await getPostById(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <Link href="/blog" className="inline-flex items-center text-sm text-foreground/70 hover:text-primary transition-colors mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>

        <article className="bg-background/70 backdrop-blur-sm border border-primary/20 rounded-md p-8 shadow-lg">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60">
              <time className="font-mono">{formatDate(post.date)}</time>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="py-1 px-2 rounded bg-primary/10 text-primary font-mono text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          <div className="prose prose-invert prose-zinc max-w-none prose-code:text-primary prose-a:text-primary" dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </div>
    </div>
  );
}
