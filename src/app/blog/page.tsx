// /src/app/blog/page.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { getSortedPostsData } from "@/lib/blog";

// Removed CSS import, inlining Tailwind for blog layout

export const metadata = {
  title: "Blog | jitendotexe",
  description:
    "Thoughts, stories, and articles about cybersecurity, travel, photography, and automotive topics.",
};

export default function BlogPage() {
  // Runs on the server; reads and sorts your markdown posts
  const posts = getSortedPostsData();

  return (
    <section className="pt-28 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-foreground/70 hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-8">Blog</h1>
        <p className="text-xl text-foreground/70 mb-8">
          Thoughts and articles about cybersecurity, travel, photography, and
          automotive topics.
        </p>

        <div className="max-w-7xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-center text-foreground/60">No posts found.</p>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-background/70 backdrop-blur-sm border border-primary/20 rounded-md p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <h2 className="text-2xl font-bold hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <time className="text-sm text-foreground/60 font-mono">
                      {formatDate(post.date)}
                    </time>
                  </div>
                  <p className="text-foreground/80 mb-4">{post.summary}</p>
                  {post.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs py-1 px-2 rounded bg-primary/10 text-primary font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}