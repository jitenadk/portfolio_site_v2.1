import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";

// Mock blog data (same as in blog/page.tsx)
const blogPosts = [
  {
    id: "secure-network-setup",
    title: "Setting Up a Secure Home Network",
    date: "2023-05-15",
    excerpt:
      "Learn how to set up a secure home network with advanced router configurations, VLANs, and proper encryption protocols.",
    tags: ["Security", "Networking", "Home Setup"],
    content: `
## Introduction

A secure home network is the first line of defense against cyber threats. In this post, we'll explore how to set up a robust and secure network for your home.

## Router Configuration

Start by securing your router:

1. Change default login credentials
2. Enable WPA3 encryption
3. Disable WPS
4. Update firmware regularly

## Setting Up VLANs

Network segmentation is crucial for security. I recommend creating at least three VLANs:

- Main network for trusted devices
- IoT network for smart home devices
- Guest network for visitors

## Firewall Rules

Implement strict firewall rules to control traffic between VLANs. This prevents compromised devices from affecting your entire network.

## Conclusion

Following these steps will significantly improve your home network security. In my next post, I'll cover advanced monitoring techniques.
    `,
  },
  {
    id: "travel-photography-tips",
    title: "Travel Photography: Capturing Moments Securely",
    date: "2023-04-02",
    excerpt:
      "Tips for keeping your photography gear and digital assets secure while traveling, without compromising on creativity.",
    tags: ["Photography", "Travel", "Security"],
    content: `
## Introduction

As photographers, we're concerned with both physical security (our gear) and digital security (our photos). This guide covers both aspects.

## Protecting Your Gear

- Use non-descript camera bags
- Never leave equipment unattended
- Consider specialized insurance for travel
- Remove brand labels if possible

## Securing Your Digital Assets

- Encrypt memory cards and backup drives
- Use a portable backup solution (I recommend a combination of physical drives and cloud backup)
- Enable remote wipe on connected devices

## Best Practices While Shooting

- Be aware of surroundings
- Avoid displaying expensive equipment in risky areas
- Work with a buddy in unfamiliar locations

## Conclusion

Both physical and digital security are essential when traveling with photography equipment. With these precautions, you can focus on creativity without worrying about your gear or photos.
    `,
  },
  {
    id: "automotive-security",
    title: "Modern Vehicles: The New Cybersecurity Frontier",
    date: "2023-03-10",
    excerpt:
      "Exploring the cybersecurity challenges in modern vehicles and how to protect your car from digital threats.",
    tags: ["Automotive", "Security", "Technology"],
    content: `
## Introduction

Modern vehicles are essentially computers on wheels. With increasing connectivity comes new security challenges for both manufacturers and owners.

## Current Vulnerabilities

- CAN bus architecture with limited security
- Keyless entry vulnerabilities
- Infotainment system exploits
- OBD-II port access

## Protecting Your Vehicle

- Keep software updated
- Use signal blocking pouches for keyless fobs when not in use
- Consider aftermarket security solutions
- Be selective about third-party devices connected to your vehicle

## The Future of Automotive Security

As vehicles become more connected, we'll likely see:

- Increased adoption of intrusion detection systems
- Over-the-air security updates
- Segregated architecture that better isolates critical systems

## Conclusion

Understanding the digital attack surface of your vehicle is the first step in keeping it secure. As automotive technology evolves, security measures must evolve with it.
    `,
  },
  {
    id: "penetration-testing",
    title: "Introduction to Penetration Testing",
    date: "2023-02-15",
    excerpt:
      "A beginner's guide to ethical hacking and penetration testing. Learn the basics of identifying vulnerabilities in systems.",
    tags: ["Cybersecurity", "Ethical Hacking", "Tutorials"],
    content: `
## Introduction

Penetration testing is a simulated cyber attack against your computer system to check for exploitable vulnerabilities. Here's how to get started.

## The Penetration Testing Process

1. **Planning and reconnaissance**
   - Define scope and goals
   - Gather intelligence on the target

2. **Scanning**
   - Port scanning
   - Vulnerability scanning

3. **Gaining access**
   - Exploiting vulnerabilities
   - Password attacks

4. **Maintaining access**
   - Persistence techniques
   - Privilege escalation

5. **Analysis and reporting**
   - Document findings
   - Provide recommendations

## Essential Tools

- Kali Linux (OS with pre-installed security tools)
- Metasploit Framework
- Nmap
- Wireshark
- Burp Suite

## Legal and Ethical Considerations

Always:
- Get proper authorization
- Stay within the defined scope
- Protect client data
- Report all findings

## Conclusion

Penetration testing is an essential skill for cybersecurity professionals. Start with legal practice environments like Hack The Box or TryHackMe to build your skills.
    `,
  },
  {
    id: "motorcycle-tech",
    title: "Tech Innovations Changing the Motorcycle Industry",
    date: "2023-01-20",
    excerpt:
      "From ride-by-wire to integrated IoT systems, how technology is revolutionizing motorcycles and the security implications.",
    tags: ["Motorcycles", "Technology", "Security"],
    content: `
## Introduction

The motorcycle industry is experiencing a technological revolution. Let's examine the newest innovations and what they mean for riders.

## Electronic Control Systems

- Ride-by-wire throttle
- Cornering ABS
- Adaptive cruise control
- Multiple riding modes

## Connectivity Features

- Smartphone integration
- Navigation systems
- Emergency notification systems
- Vehicle telemetry and analytics

## Security Implications

With increased technology comes new security concerns:

- ECU hacking risks
- Privacy concerns with location tracking
- Vulnerability in connected systems

## The Future of Motorcycling

- Electric powertrains
- Automated safety systems
- Augmented reality displays
- Advanced rider assistance systems

## Conclusion

Technology is making motorcycles safer and more capable, but also introduces new security challenges that manufacturers must address.
    `,
  },
];

type Params = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: Params) {
  const post = blogPosts.find((post) => post.id === params.slug);

  if (!post) {
    return {
      title: "Post Not Found | jitendotexe",
      description: "The blog post you're looking for doesn't exist.",
    };
  }

  return {
    title: `${post.title} | jitendotexe`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: Params) {
  const post = blogPosts.find((post) => post.id === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="py-24">
      <div className="max-w-4xl mx-auto">
        <Link href="/blog" className="inline-flex items-center text-sm text-foreground/70 hover:text-primary transition-colors mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>

        <article className="cyber-card p-8">
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

          <div className="prose prose-invert prose-zinc max-w-none prose-code:text-primary prose-a:text-primary">
            {post.content.split("\n").map((line, index) => {
              if (line.startsWith("## ")) {
                return <h2 key={index} className="text-2xl font-bold mb-4 mt-8">{line.substring(3)}</h2>;
              }

              if (line.trim() === "") {
                return <div key={index} className="my-4" />;
              }

              if (line.startsWith("- ")) {
                return <li key={index} className="mb-1 ml-5">{line.substring(2)}</li>;
              }

              if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ") || line.startsWith("4. ") || line.startsWith("5. ")) {
                return <li key={index} className="mb-1 ml-5">{line.substring(3)}</li>;
              }

              return <p key={index} className="mb-4">{line}</p>;
            })}
          </div>
        </article>
      </div>
    </div>
  );
}
