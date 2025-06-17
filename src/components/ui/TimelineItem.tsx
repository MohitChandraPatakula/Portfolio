"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import type { Experience } from "@/data/resume-data";
import { Briefcase, CalendarDays } from "lucide-react";
import { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  item: Experience;
  animationDelay?: string;
}

export default function TimelineItem({ item, animationDelay }: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = itemRef.current;
    if (currentRef) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            currentRef.classList.add('revealed');
            observer.unobserve(currentRef);
          }
        },
        { threshold: 0.15 }
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
        "motion-reveal motion-reveal-fadeinup w-full"
      )}
      style={{ animationDelay }}
    >
      <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 border-transparent hover:border-primary/30 rounded-lg w-full">
        <CardHeader className="pb-3">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 mt-1.5 p-3 flex items-center justify-center bg-gradient-to-br from-primary to-accent shadow-lg w-12 h-12 rounded-lg">
              <Briefcase className="font-semibold text-primary-foreground h-6 w-6" />
            </div>
            <div className="flex-grow">
              <CardTitle className="text-xl lg:text-2xl font-headline text-primary">{item.role}</CardTitle>
              <CardDescription className="font-semibold text-foreground">{item.company}</CardDescription>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                {item.dates}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <ul className="list-disc pl-5 ml-2 space-y-1.5 text-sm text-muted-foreground">
            {item.responsibilities.map((responsibility, i) => (
              <li key={i}>{responsibility}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
