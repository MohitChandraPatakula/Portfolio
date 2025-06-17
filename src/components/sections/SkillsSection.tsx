
"use client";
import { resumeData } from "@/data/resume-data";
import SkillBar from "@/components/ui/SkillBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers } from "lucide-react";
import { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

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
              const title = currentRef.querySelector('.section-title.motion-reveal');
              const subtitle = currentRef.querySelector('.section-subtitle.motion-reveal');
              if (title) title.classList.add('revealed');
              if (subtitle) subtitle.classList.add('revealed');
              
              const items = currentRef.querySelectorAll('.motion-reveal-item');
              items.forEach((item, index) => {
                (item as HTMLElement).style.transitionDelay = `${index * 100}ms`;
                item.classList.add('revealed');
              });
              observer.unobserve(entry.target); 
            }
          });
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
    <section id="skills" ref={sectionRef} className="bg-secondary/30 dark:bg-secondary/10">
      <div className="container mx-auto px-4">
        <h2 className="section-title font-headline motion-reveal motion-reveal-fadeinup">My Skills</h2>
        <p className="section-subtitle motion-reveal motion-reveal-fadeinup" style={{ animationDelay: '100ms' }}>
          A showcase of my technical expertise and tools I master.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((category, catIndex) => (
            <div 
              key={category.name} 
              className="motion-reveal-item h-full"
            >
              <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-transparent hover:border-primary/30 rounded-lg h-full flex flex-col group">
                <CardHeader className="text-center">
                  <div className="inline-block p-3 bg-primary/10 rounded-full mb-3 group-hover:bg-accent/10 transition-colors duration-300">
                     <Layers className="h-8 w-8 text-primary group-hover:text-accent transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-2xl font-headline text-primary group-hover:text-accent transition-colors duration-300">{category.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow pt-2">
                  {/* Skills will be displayed as a list of names */}
                  <ul className="space-y-1">
                    {category.skills.map((skill, skillIndex) => (
                       <li key={skill.name} className="flex items-center">
                         <SkillBar 
                            name={skill.name} 
                            level={skill.level || 0} // Level is not used for display but passed for consistency
                          />
                       </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

