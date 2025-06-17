
"use client";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/data/resume-data";
import { ExternalLink, Info, Layers } from "lucide-react";
import { useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  animationDelay?: string;
}

export default function ProjectCard({ project, animationDelay }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [bgPositionY, setBgPositionY] = useState(50); 

  useEffect(() => {
    const currentRef = cardRef.current;
    if (currentRef) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            currentRef.classList.add('revealed');
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
  
  useEffect(() => {
    if (!isIntersecting || !cardRef.current || !project.imageUrl) return;

    const handleScroll = () => {
      if (cardRef.current) {
        const { top, height } = cardRef.current.getBoundingClientRect();
        const screenHeight = window.innerHeight;
        const relativePosition = (top + height / 2 - screenHeight / 2) / (screenHeight / 2);
        const newY = 50 - relativePosition * 10; 
        setBgPositionY(Math.max(0, Math.min(100, newY))); 
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isIntersecting, project.imageUrl]);


  return (
    <div 
      ref={cardRef} 
      className="motion-reveal motion-reveal-fadeinup h-full"
      style={{ animationDelay: animationDelay }}
    >
      <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 h-full flex flex-col group border-transparent hover:border-primary/30">
        {project.imageUrl ? (
          <div 
            className="relative h-56 w-full bg-cover bg-center transition-all duration-300 ease-out group-hover:scale-105"
            style={{ 
              backgroundImage: `url(${project.imageUrl})`,
              backgroundPositionY: `${bgPositionY}%`,
            }}
            data-ai-hint={project.dataAiHint || 'technology project'}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 group-hover:from-black/30 transition-all duration-300"></div>
          </div>
        ) : (
          <div className="relative h-56 w-full bg-gradient-to-br from-secondary to-accent/30 flex items-center justify-center">
            <Layers className="w-16 h-16 text-primary/50" />
          </div>
        )}
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-headline text-primary group-hover:text-accent transition-colors duration-300">{project.name}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">{project.year}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="secondary" className="bg-accent/10 text-accent dark:bg-accent/70 dark:text-accent-foreground group-hover:bg-accent/20 transition-colors duration-300">{tech}</Badge>
            ))}
            {project.technologies.length > 4 && <Badge variant="outline" className="border-primary/30 text-primary/80 group-hover:bg-primary/10">+{project.technologies.length - 4} more</Badge>}
          </div>
        </CardContent>
        <CardFooter className="pt-4 mt-auto">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full group/button border-primary/30 hover:border-primary hover:bg-primary/10 text-primary hover:text-primary transition-all duration-300 hover:animate-pulseGlow">
                <Info className="mr-2 h-4 w-4 group-hover/button:text-accent transition-colors" /> Learn More
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px] bg-background dark:bg-popover rounded-lg">
              <DialogHeader>
                <DialogTitle className="font-headline text-2xl text-primary">{project.name}</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {project.year}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
                {project.imageUrl && (
                  <div className="relative w-full h-64 rounded-md overflow-hidden shadow-lg">
                    <Image src={project.imageUrl} alt={project.name} layout="fill" objectFit="cover" data-ai-hint={project.dataAiHint || 'technology project'} />
                  </div>
                )}
                <p className="text-sm text-foreground leading-relaxed">{project.description}</p>
                {project.details && (
                  <>
                    <h4 className="font-semibold text-primary mt-2">Key Features & Details:</h4>
                    <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground">
                      {project.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  </>
                )}
                <h4 className="font-semibold text-primary mt-2">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-accent/10 text-accent dark:bg-accent/70 dark:text-accent-foreground">{tech}</Badge>
                  ))}
                </div>
              </div>
              {/* <Button variant="default" className="mt-4 w-full"><ExternalLink className="mr-2 h-4 w-4" /> View Project</Button> */}
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
}
