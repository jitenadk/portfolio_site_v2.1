// src/app/projects/[slug]/loading.tsx
import React from 'react';

export default function LoadingProject() {
  return (
    <section className="pt-28 pb-24 bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4">
        <div className="animate-pulse">
          {/* Back link placeholder */}
          <div className="h-6 w-36 bg-gray-300 dark:bg-gray-700 rounded mb-8"></div>
          
          <article className="bg-card p-6 sm:p-8 rounded-lg shadow-lg border border-border">
            <header className="mb-8 border-b border-border pb-4">
              {/* Title placeholder */}
              <div className="h-10 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
              {/* Date placeholder */}
              <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
              {/* Summary placeholder */}
              <div className="h-5 w-full bg-gray-300 dark:bg-gray-700 rounded mt-2"></div>
              <div className="h-5 w-5/6 bg-gray-300 dark:bg-gray-700 rounded mt-1"></div>
            </header>
            
            {/* Content placeholder */}
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>

            {/* Tags placeholder */}
            <footer className="mt-12 pt-6 border-t border-border">
              <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
              <div className="flex flex-wrap gap-2">
                <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </section>
  );
}
