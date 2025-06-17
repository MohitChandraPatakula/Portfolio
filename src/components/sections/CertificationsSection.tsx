"use client";
import { resumeData } from "@/data/resume-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";
import { useEffect, useRef } from 'react';

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
              setTimeout(() => item.classList.add('revealed'), index * 150);
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
          My professional certifications and qualifications.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div key={index} className="motion-reveal motion-reveal-item">
              <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium font-body text-primary">
                    {cert.name}
                  </CardTitle>
                  <Award className="h-6 w-6 text-accent" />
                </CardHeader>
                <CardContent>
                  {cert.issuer && (
                    <p className="text-xs text-muted-foreground">
                      Issued by: {cert.issuer}
                    </p>
                  )}
                  {cert.year && (
                    <p className="text-xs text-muted-foreground">
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
