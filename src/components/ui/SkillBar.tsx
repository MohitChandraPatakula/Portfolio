
"use client";
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface SkillBarProps {
  name: string;
  level: number; // 0-100
  animationDelay?: string; // This prop is kept for potential future use but not directly used for fadeInUp here
}

export default function SkillBar({ name, level, animationDelay }: SkillBarProps) {
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
      ref={barRef} 
      className={cn(
        "mb-4", // Removed motion-reveal and motion-reveal-fadeinup
      )}
      // style={{ animationDelay }} // Removed as motion-reveal-fadeinup is removed
    >
      <div className="flex justify-between mb-1.5">
        <span className="text-base font-medium text-primary dark:text-primary font-body">{name}</span>
        <span className="text-sm font-semibold text-accent dark:text-accent font-body">{level}%</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-5 dark:bg-muted shadow-inner overflow-hidden">
        <div
          className={cn(
            "bg-gradient-to-r from-primary to-accent h-5 rounded-full transition-all duration-[1500ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]",
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
