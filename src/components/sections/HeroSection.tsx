"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { resumeData } from "@/data/resume-data";
import { Github, Linkedin, Mail, Phone, MapPin, Download, Sparkles } from "lucide-react";
import { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

export default function HeroSection() {
  const { name, location, email, phone, linkedin, linkedinHandle, summary, github, githubHandle } = resumeData.contactInfo;
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const summaryRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const contactLinksRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target === headingRef.current) headingRef.current?.classList.add('revealed');
            if (entry.target === subheadingRef.current) subheadingRef.current?.classList.add('revealed');
            if (entry.target === summaryRef.current) summaryRef.current?.classList.add('revealed');
            if (entry.target === buttonsRef.current) buttonsRef.current?.classList.add('revealed');
            if (entry.target === contactLinksRef.current) contactLinksRef.current?.classList.add('revealed');
            if (entry.target === imageRef.current) imageRef.current?.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const refs = [headingRef, subheadingRef, summaryRef, buttonsRef, contactLinksRef, imageRef];
    refs.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });
    
    return () => {
      refs.forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);


  return (
    <section id="hero" ref={sectionRef} className="min-h-screen flex items-center bg-gradient-to-br from-background via-secondary/30 to-background dark:from-background dark:via-secondary/20 dark:to-background pt-24 md:pt-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3 text-center md:text-left">
            <h1 ref={headingRef} className="text-4xl sm:text-5xl lg:text-6xl font-headline font-bold text-primary mb-4 motion-reveal motion-reveal-fadeinup">
              {name}
            </h1>
            <p ref={subheadingRef} className="text-xl sm:text-2xl text-foreground mb-6 font-semibold motion-reveal motion-reveal-fadeinup" style={{ animationDelay: '0.2s' }}>
              Software Engineer <Sparkles className="inline-block h-6 w-6 text-accent" />
            </p>
            <p ref={summaryRef} className="text-md lg:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto md:mx-0 motion-reveal motion-reveal-fadeinup" style={{ animationDelay: '0.4s' }}>
              {summary}
            </p>
            <div ref={buttonsRef} className="flex flex-wrap justify-center md:justify-start gap-4 mb-8 motion-reveal motion-reveal-fadeinup" style={{ animationDelay: '0.6s' }}>
              <Button asChild variant="default" size="lg" className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <Link href="#projects">
                  <Download className="mr-2 h-5 w-5" /> View My Work
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-primary/50 hover:bg-primary/10">
                <Link href="#contact">
                  Get In Touch
                </Link>
              </Button>
            </div>
            <div ref={contactLinksRef} className="flex flex-wrap justify-center md:justify-start items-center gap-x-6 gap-y-3 text-sm text-muted-foreground motion-reveal motion-reveal-fadeinup" style={{ animationDelay: '0.8s' }}>
              <Link href={`mailto:${email}`} className="flex items-center hover:text-primary transition-colors group">
                <Mail className="mr-2 h-4 w-4 group-hover:animate-pulseGlow" /> {email}
              </Link>
              <Link href={`tel:${phone}`} className="flex items-center hover:text-primary transition-colors group">
                <Phone className="mr-2 h-4 w-4 group-hover:animate-pulseGlow" /> {phone}
              </Link>
              <span className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" /> {location}
              </span>
              <Link href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary transition-colors group">
                <Linkedin className="mr-2 h-4 w-4 group-hover:animate-pulseGlow" /> {linkedinHandle}
              </Link>
              {github && githubHandle && (
                 <Link href={github} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary transition-colors group">
                  <Github className="mr-2 h-4 w-4 group-hover:animate-pulseGlow" /> {githubHandle}
                </Link>
              )}
            </div>
          </div>
          <div ref={imageRef} className="md:col-span-2 flex justify-center motion-reveal motion-reveal-scalein" style={{ animationDelay: '0.3s' }}>
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-primary/30 hover:border-primary/70 transition-all duration-300">
              <Image
                src="https://storage.googleapis.com/project-fabrica-dev/images/Y2hhdC1jb21wbGV0aW9uLWE2MDIxYzVjLWQ2ZTEtNGM5ZC1hYmFhLTk4ODAyZjdlNDdkMw==/image.png"
                alt={name}
                layout="fill"
                objectFit="cover"
                className="transform hover:scale-110 transition-transform duration-700 ease-in-out"
                data-ai-hint="profile picture"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
