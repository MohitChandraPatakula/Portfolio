
"use client";
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface SkillBarProps {
  name: string;
  level: number; // 0-100, kept in props for data consistency, but not used for display
}

export default function SkillBar({ name, level }: SkillBarProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = itemRef.current;
    if (currentRef) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(currentRef);
          }
        },
        { threshold: 0.01 } // Lowered threshold
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
      className={cn(
        "mb-2 py-1", // Adjusted padding and margin
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        "transition-all duration-500 ease-out"
      )}
    >
      <span className="text-base font-medium text-primary dark:text-primary font-body">{name}</span>
      {/* Percentage and bar elements removed */}
    </div>
  );
}

