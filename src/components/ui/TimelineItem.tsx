"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import type { Experience } from "@/data/resume-data";
import { Briefcase } from "lucide-react";
import { useEffect, useRef } from 'react';

interface TimelineItemProps {
  item: Experience;
  isLeft: boolean;
}

export default function TimelineItem({ item, isLeft }: TimelineItemProps) {
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
        { threshold: 0.2 }
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
    <div ref={itemRef} className={`motion-reveal mb-8 flex justify-between items-center w-full ${isLeft ? 'flex-row-reverse' : ''}`}>
      <div className="order-1 w-5/12"></div>
      <div className={`z-20 flex items-center order-1 bg-primary shadow-xl w-10 h-10 sm:w-12 sm:h-12 rounded-full`}>
        <Briefcase className="mx-auto font-semibold text-primary-foreground h-5 w-5 sm:h-6 sm:w-6" />
      </div>
      <div className={`order-1 w-5/12 px-3 py-4`}>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-headline text-primary">{item.role}</CardTitle>
            <CardDescription className="font-semibold text-foreground">{item.company}</CardDescription>
            <CardDescription className="text-sm text-muted-foreground">{item.dates}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              {item.responsibilities.map((responsibility, i) => (
                <li key={i}>{responsibility}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
