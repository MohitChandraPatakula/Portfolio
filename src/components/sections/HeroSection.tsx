"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { resumeData } from "@/data/resume-data";
import { Github, Linkedin, Mail, Phone, MapPin, Download } from "lucide-react";
import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const { name, location, email, phone, linkedin, linkedinHandle, summary, github, githubHandle } = resumeData.contactInfo;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    if (currentRef) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
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


  return (
    <section id="hero" ref={sectionRef} className="min-h-screen flex items-center bg-gradient-to-br from-background to-secondary/30 dark:from-background dark:to-secondary/10 pt-24 md:pt-16 motion-reveal">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-3 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-bold text-primary mb-4">
              {name}
            </h1>
            <p className="text-xl sm:text-2xl text-foreground mb-6 font-medium">
              Software Engineer
            </p>
            <p className="text-md lg:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto md:mx-0">
              {summary}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
              <Button asChild variant="default" size="lg" className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <Link href="#projects">
                  <Download className="mr-2 h-5 w-5" /> View My Work
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <Link href="#contact">
                  Get In Touch
                </Link>
              </Button>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <Link href={`mailto:${email}`} className="flex items-center hover:text-primary transition-colors">
                <Mail className="mr-2 h-4 w-4" /> {email}
              </Link>
              <Link href={`tel:${phone}`} className="flex items-center hover:text-primary transition-colors">
                <Phone className="mr-2 h-4 w-4" /> {phone}
              </Link>
              <span className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" /> {location}
              </span>
              <Link href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary transition-colors">
                <Linkedin className="mr-2 h-4 w-4" /> {linkedinHandle}
              </Link>
              {github && githubHandle && (
                 <Link href={github} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary transition-colors">
                  <Github className="mr-2 h-4 w-4" /> {githubHandle}
                </Link>
              )}
            </div>
          </div>
          <div className="md:col-span-2 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-primary/50">
              <Image
                src="https://placehold.co/400x400.png"
                alt={name}
                layout="fill"
                objectFit="cover"
                className="transform hover:scale-110 transition-transform duration-500 ease-in-out"
                data-ai-hint="professional portrait"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
