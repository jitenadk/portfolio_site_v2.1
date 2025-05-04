import React from "react";

interface SectionHeaderProps {
  upperText: string;
  title: string;
}

export default function SectionHeader({ upperText, title }: SectionHeaderProps) {
  return (
    <div className="mb-10 text-center">
      <div className="terminal-text text-sm md:text-base mb-1 font-mono text-primary" >{upperText}</div>
      <h1 className="text-4xl md:text-5xl font-bold mb-2">
        {title}
      </h1>
      <div className="mx-auto mt-2 mb-2 h-1 w-24 bg-primary rounded" />
    </div>
  );
}
