import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { formatDate } from "@/lib/utils";

// Mock blog data
const blogPosts = [
  {
    id: "secure-network-setup",
    title: "Setting Up a Secure Home Network",
    date: "2023-05-15",
    excerpt:
      "Learn how to set up a secure home network with advanced router configurations, VLANs, and proper encryption protocols.",
    tags: ["Security", "Networking", "Home Setup"],
  },
  {
    id: "travel-photography-tips",
    title: "Travel Photography: Capturing Moments Securely",
    date: "2023-04-02",
    excerpt:
      "Tips for keeping your photography gear and digital assets secure while traveling, without compromising on creativity.",
    tags: ["Photography", "Travel", "Security"],
  },
  {
    id: "automotive-security",
    title: "Modern Vehicles: The New Cybersecurity Frontier",
    date: "2023-03-10",
    excerpt:
      "Exploring the cybersecurity challenges in modern vehicles and how to protect your car from digital threats.",
    tags: ["Automotive", "Security", "Technology"],
  },
  {
    id: "penetration-testing",
    title: "Introduction to Penetration Testing",
    date: "2023-02-15",
    excerpt:
      "A beginner's guide to ethical hacking and penetration testing. Learn the basics of identifying vulnerabilities in systems.",
    tags: ["Cybersecurity", "Ethical Hacking", "Tutorials"],
  },
  {
    id: "motorcycle-tech",
    title: "Tech Innovations Changing the Motorcycle Industry",
    date: "2023-01-20",
    excerpt:
      "From ride-by-wire to integrated IoT systems, how technology is revolutionizing motorcycles and the security implications.",
    tags: ["Motorcycles", "Technology", "Security"],
  },
];

export const metadata = {
  title: "Blog | jitendotexe",
  description: "Thoughts, stories, and articles about cybersecurity, travel, photography, and automotive topics.",
};

export default function BlogPage() {
  return (
    <div className="py-24">
      <div className="max-w-5xl mx-auto mb-12">
        <Link href="/" className="inline-flex items-center text-sm text-foreground/70 hover:text-primary transition-colors mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-8">Blog</h1>
        <p className="text-xl text-foreground/70 mb-4">
          Thoughts and articles about cybersecurity, travel, photography, and automotive topics.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="cyber-card p-6">
          <div className="font-mono text-xs text-primary mb-6">~/jitendotexe/blog $ ls -la *.md</div>

          <div className="space-y-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="border-b border-primary/10 pb-8 last:border-b-0 last:pb-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                  <h2 className="text-2xl font-bold hover:text-primary transition-colors">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h2>
                  <time className="text-sm text-foreground/60 font-mono">{formatDate(post.date)}</time>
                </div>
                <p className="text-foreground/80 mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs py-1 px-2 rounded bg-primary/10 text-primary font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
