import Link from 'next/link';
import { Home, BookOpen, Camera } from 'lucide-react';

const cursorStyle = {
  animation: 'blink 1s steps(2, start) infinite',
};

const blinkKeyframes = `
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}`;

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-24" role="alert" aria-live="assertive">
      {/* Inline style for blinking cursor */}
      <style>{blinkKeyframes}</style>
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-6 text-primary font-mono text-lg" aria-label="Error code">404</div>
        {/* SVG Illustration */}
        <div className="flex justify-center mb-6">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="40" cy="40" r="38" stroke="#6366F1" strokeWidth="4" fill="#F1F5F9" />
            <text x="50%" y="54%" textAnchor="middle" fill="#6366F1" fontSize="32" fontWeight="bold" dy=".3em">?</text>
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Page Not Found</h1>
        <p className="text-lg text-foreground/70 mb-8">
          The page you are looking for doesn&apos;t exist or has been moved.<br />
          You can head back home, or explore other sections below.
        </p>
        <div className="cyber-card p-8 bg-background/70 backdrop-blur-sm border border-primary/20 rounded-lg mb-8">
          <div className="font-mono text-sm mb-4 terminal-text text-left">
            $ whoami<br />
            visitor<br />
            $ find /home/jitendotexe -name "page"<br />
            find: No such file or directory<br />
            $ echo $?<br />
            404<br />
            $ <span style={cursorStyle}>_</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
