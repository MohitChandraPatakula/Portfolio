"use client";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/data/resume-data";
import { ExternalLink, Info } from "lucide-react";
import { useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [bgPositionY, setBgPositionY] = useState(50); // Initial background position Y in %

  useEffect(() => {
    const currentRef = cardRef.current;
    if (currentRef) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsIntersecting(entry.isIntersecting);
          if (entry.isIntersecting) {
             currentRef.classList.add('revealed');
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
    if (!isIntersecting || !cardRef.current) return;

    const handleScroll = () => {
      if (cardRef.current) {
        const { top, height } = cardRef.current.getBoundingClientRect();
        const screenHeight = window.innerHeight;
        // Calculate the position of the card center relative to the viewport center
        const relativePosition = (top + height / 2 - screenHeight / 2) / (screenHeight / 2);
        // Adjust parallax effect: Range from 0% to 100% for background-position-y
        // When card center is at viewport top, y = 0%. When at viewport bottom, y = 100%.
        // The multiplier (e.g., 20) controls the intensity of the parallax effect.
        const newY = 50 - relativePosition * 15; // Adjust 15 for parallax strength
        setBgPositionY(Math.max(0, Math.min(100, newY))); // Clamp between 0 and 100
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isIntersecting]);


  return (
    <div ref={cardRef} className="motion-reveal">
    <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 h-full flex flex-col">
      {project.imageUrl && (
        <div 
          className="relative h-56 w-full bg-cover bg-center transition-all duration-300 ease-out"
          style={{ 
            backgroundImage: `url(${project.imageUrl})`,
            backgroundPositionY: `${bgPositionY}%`,
          }}
          data-ai-hint={project.dataAiHint || 'technology project'}
        >
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300"></div>
        </div>
      )}
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-headline text-primary">{project.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{project.year}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-accent/20 text-accent-foreground dark:bg-accent/70 dark:text-accent">{tech}</Badge>
          ))}
          {project.technologies.length > 4 && <Badge variant="secondary">+{project.technologies.length - 4} more</Badge>}
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full group">
              <Info className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" /> Learn More
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px] bg-background dark:bg-popover">
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl text-primary">{project.name}</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {project.year}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
              {project.imageUrl && (
                <div className="relative w-full h-64 rounded-md overflow-hidden">
                  <Image src={project.imageUrl} alt={project.name} layout="fill" objectFit="cover" data-ai-hint={project.dataAiHint || 'technology project'} />
                </div>
              )}
              <p className="text-sm text-foreground">{project.description}</p>
              {project.details && (
                <>
                  <h4 className="font-semibold text-foreground mt-2">Key Features & Details:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {project.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </>
              )}
              <h4 className="font-semibold text-foreground mt-2">Technologies Used:</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="bg-accent/20 text-accent-foreground dark:bg-accent/70 dark:text-accent">{tech}</Badge>
                ))}
              </div>
            </div>
            {/* Add link to project if available */}
            {/* <Button variant="default" className="mt-4 w-full"><ExternalLink className="mr-2 h-4 w-4" /> View Project</Button> */}
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
    </div>
  );
}
