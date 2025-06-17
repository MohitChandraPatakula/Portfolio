"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import type { Experience } from "@/data/resume-data";
import { Briefcase, CalendarDays } from "lucide-react";
import { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  item: Experience;
  isLeft: boolean;
  animationDelay?: string;
}

export default function TimelineItem({ item, isLeft, animationDelay }: TimelineItemProps) {
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
        "motion-reveal mb-10 flex justify-between items-center w-full",
        isLeft ? 'flex-row-reverse motion-reveal-fadeinup' : 'motion-reveal-fadeinup' // Example: different animation based on side
      )}
      style={{ animationDelay }}
    >
      <div className="order-1 w-5/12"></div>
      <div className={`z-20 flex items-center order-1 bg-gradient-to-br from-primary to-accent shadow-xl w-12 h-12 sm:w-14 sm:h-14 rounded-full transform group-hover:scale-110 transition-transform duration-300`}>
        <Briefcase className="mx-auto font-semibold text-primary-foreground h-6 w-6 sm:h-7 sm:w-7" />
      </div>
      <div className={`order-1 w-5/12 px-2 py-4 sm:px-4`}>
        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 border-transparent hover:border-primary/30 rounded-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl lg:text-2xl font-headline text-primary">{item.role}</CardTitle>
            <CardDescription className="font-semibold text-foreground">{item.company}</CardDescription>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
              {item.dates}
            </div>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground">
              {item.responsibilities.slice(0,3).map((responsibility, i) => ( // Show first 3 by default
                <li key={i}>{responsibility}</li>
              ))}
              {item.responsibilities.length > 3 && <li className="text-xs text-accent hover:underline cursor-pointer">Show more...</li>}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
