import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import { getPostById } from "@/lib/blog";
import { Button } from "@/components/ui/button";



type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Params) {
  const resolvedParams = await params;
  const post = await getPostById(resolvedParams.slug);

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
  const resolvedParams = await params;
  const post = await getPostById(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-sm text-foreground/70 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>

        <article className="bg-background/70 backdrop-blur-sm border border-primary/20 rounded-lg overflow-hidden shadow-lg">
          {post.featuredImage && (
            <div className="relative h-[400px] w-full">
              <Image 
                src={post.featuredImage} 
                alt={post.imageAlt || post.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}

          <div className="p-8">
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-semibold mb-6">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-sm text-foreground/70 border-b border-primary/10 pb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <time>{formatDate(post.date)}</time>
                </div>
                
                {post.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-xs py-1 px-2 rounded-full bg-primary/10 text-primary font-mono flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </header>

            <div 
              className="blog-content prose prose-invert prose-zinc max-w-none prose-code:text-primary prose-a:text-primary w-full break-words" 
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          </div>
        </article>
        
        <div className="mt-8 flex justify-center">
          <Button asChild variant="ghost" size="sm" className="group border border-primary/20 hover:bg-primary/4">
            <Link href="/blog" className="inline-flex items-center text-sm text-foreground/70 hover:text-primary transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all posts
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
