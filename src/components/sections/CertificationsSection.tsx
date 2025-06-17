"use client";
import { resumeData } from "@/data/resume-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, CheckCircle } from "lucide-react";
import { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

export default function CertificationsSection() {
  const { certifications } = resumeData;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    if (currentRef) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const items = currentRef.querySelectorAll('.motion-reveal-item');
            items.forEach((item, index) => {
              // Stagger the animation
              (item as HTMLElement).style.animationDelay = `${index * 150}ms`;
              item.classList.add('revealed');
            });
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
    <section id="certifications" ref={sectionRef} className="bg-secondary/30 dark:bg-secondary/10">
      <div className="container mx-auto px-4">
        <h2 className="section-title font-headline">Certifications</h2>
        <p className="section-subtitle">
          My professional certifications and qualifications demonstrating continuous learning.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div key={index} className="motion-reveal motion-reveal-item motion-reveal-fadeinup h-full">
              <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border-transparent hover:border-primary/30 group rounded-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium font-body text-primary group-hover:text-accent transition-colors duration-300">
                    {cert.name}
                  </CardTitle>
                  <Award className="h-7 w-7 text-accent group-hover:text-primary transition-colors duration-300 transform group-hover:rotate-12" />
                </CardHeader>
                <CardContent>
                  {cert.issuer && (
                    <p className="text-xs text-muted-foreground flex items-center">
                       <CheckCircle className="h-3.5 w-3.5 mr-1.5 text-green-500 shrink-0"/> Issued by: {cert.issuer}
                    </p>
                  )}
                  {cert.year && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Year: {cert.year}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
