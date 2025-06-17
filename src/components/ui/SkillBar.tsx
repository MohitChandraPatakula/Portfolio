"use client";
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface SkillBarProps {
  name: string;
  level: number; // 0-100
}

export default function SkillBar({ name, level }: SkillBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = barRef.current;
    if (currentRef) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(currentRef);
          }
        },
        { threshold: 0.5 } // Trigger when 50% of the bar is visible
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
    <div ref={barRef} className="mb-4 motion-reveal">
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-primary dark:text-primary-foreground font-body">{name}</span>
        <span className="text-sm font-medium text-primary dark:text-primary-foreground font-body">{level}%</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-4 dark:bg-muted">
        <div
          className={cn(
            "bg-accent h-4 rounded-full transition-all duration-[1500ms] ease-out",
             isVisible ? "animate-fill-bar" : "w-0"
          )}
          style={{ '--skill-level': `${level}%` } as React.CSSProperties}
          role="progressbar"
          aria-valuenow={level}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${name} skill level`}
        ></div>
      </div>
    </div>
  );
}
