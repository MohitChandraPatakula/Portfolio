"use client";
import { resumeData } from "@/data/resume-data";
import SkillBar from "@/components/ui/SkillBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers } from "lucide-react";
import { useEffect, useRef } from 'react';

export default function SkillsSection() {
  const { skills } = resumeData;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    if (currentRef) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Animate the section title and subtitle first if they exist and use motion-reveal
              const title = currentRef.querySelector('.section-title.motion-reveal');
              const subtitle = currentRef.querySelector('.section-subtitle.motion-reveal');
              if (title) title.classList.add('revealed');
              if (subtitle) subtitle.classList.add('revealed');
              
              // Then animate the items
              const items = currentRef.querySelectorAll('.motion-reveal-item');
              items.forEach((item, index) => {
                (item as HTMLElement).style.animationDelay = `${index * 100}ms`;
                item.classList.add('revealed');
              });
              observer.unobserve(entry.target); // Unobserve after revealing to prevent re-triggering
            }
          });
        },
        { threshold: 0.1 } // Trigger when 10% of the section is visible
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
    <section id="skills" ref={sectionRef} className="bg-secondary/30 dark:bg-secondary/10">
      <div className="container mx-auto px-4">
        <h2 className="section-title font-headline motion-reveal motion-reveal-fadeinup">My Skills</h2>
        <p className="section-subtitle motion-reveal motion-reveal-fadeinup" style={{ animationDelay: '100ms' }}>
          A showcase of my technical expertise, tools I master, and methodologies I follow.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((category, catIndex) => (
            <div 
              key={category.name} 
              className="motion-reveal motion-reveal-item motion-reveal-fadeinup h-full"
              // Staggering will be handled by the useEffect observer
            >
              <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-transparent hover:border-primary/30 rounded-lg h-full flex flex-col group">
                <CardHeader className="text-center">
                  <div className="inline-block p-3 bg-primary/10 rounded-full mb-3 group-hover:bg-accent/10 transition-colors duration-300">
                     <Layers className="h-8 w-8 text-primary group-hover:text-accent transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-2xl font-headline text-primary group-hover:text-accent transition-colors duration-300">{category.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow pt-2">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar 
                      key={skill.name} 
                      name={skill.name} 
                      level={skill.level || 80} 
                      // SkillBar has its own observer, but animation delay can be kept for overall card reveal
                      // animationDelay={`${(catIndex * 100) + (skillIndex * 50) + 200}ms`} // Add base delay for section reveal
                    />
                  ))}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
