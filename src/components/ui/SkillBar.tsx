
"use client";
import { useEffect, useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SkillBarProps {
  name: string;
  level?: number; // Kept for data consistency, but not used for display
  animationDelay?: string; 
}

export default function SkillBar({ name, animationDelay }: SkillBarProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = itemRef.current;
    if (currentRef) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 } 
      );
      observer.observe(currentRef);
      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }
  }, []);

  return (
    <div
      ref={itemRef}
      className="motion-reveal motion-reveal-fadeinup" 
      style={{ animationDelay: animationDelay || '0ms' }} 
    >
      <Badge 
        variant="secondary" 
        className={cn(
          "text-base font-medium py-2 px-4 rounded-md", 
          "bg-accent/10 text-accent dark:bg-accent/20 dark:text-accent-foreground",
          "hover:bg-accent/20 dark:hover:bg-accent/30",
          "transition-all duration-300 ease-in-out transform hover:scale-110"
        )}
      >
        {name}
      </Badge>
    </div>
  );
}
