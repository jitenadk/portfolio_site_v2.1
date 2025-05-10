import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { getSortedPostsData } from "@/lib/blog";
import SectionHeader from '@/components/ui/SectionHeader';



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

        <SectionHeader upperText="&lt;featured posts /&gt;" title="Blog" />
        <p className="text-xl text-foreground/70 mb-8 text-center">
          Thoughts and articles about cybersecurity, travel, photography, and
          automotive topics.
        </p>

        <div className="max-w-7xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-center text-foreground/60">No posts found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.slug} className="bg-background/70 backdrop-blur-sm border border-primary/20 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/40 flex flex-col h-full">
                  <Link href={`/blog/${post.slug}`} className="block relative overflow-hidden group">
                    <div className="relative h-48 w-full overflow-hidden">
                      {post.featuredImage ? (
                        <Image 
                          src={post.featuredImage} 
                          alt={post.imageAlt || post.title}
                          fill
                          priority={posts.indexOf(post) < 3}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <span className="font-mono text-sm opacity-70">No featured image</span>
                        </div>
                      )}
                    </div>
                  </Link>
                  
                  <div className="p-5 flex-grow flex flex-col">
                    <div className="flex items-center gap-2 text-xs text-foreground/60 mb-3">
                      <Calendar className="h-3 w-3" />
                      <time>{formatDate(post.date)}</time>
                    </div>
                    
                    <h2 className="text-xl font-semibold mb-3 hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    
                    <p className="text-foreground/80 mb-4 text-sm flex-grow">{post.summary}</p>
                    
                    {post.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs py-1 px-2 rounded-full bg-primary/10 text-primary font-mono flex items-center gap-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}