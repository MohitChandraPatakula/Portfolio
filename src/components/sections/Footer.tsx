import Link from "next/link";
import { resumeData } from "@/data/resume-data";
import { Github, Linkedin, Mail, Zap } from "lucide-react";

export default function Footer() {
  const { name, email, linkedin, github } = resumeData.contactInfo;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border/50 dark:bg-popover">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex items-center justify-center md:justify-start">
            <Zap className="h-8 w-8 text-primary mr-2" />
            <span className="text-xl font-headline font-bold text-primary">MotionFolio</span>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {currentYear} {name}. All rights reserved.</p>
            <p>Built with Next.js & Tailwind CSS.</p>
          </div>

          <div className="flex justify-center md:justify-end space-x-4">
            {linkedin && (
              <Link href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
            )}
            {github && (
              <Link href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                <Github className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
            )}
            {email && (
              <Link href={`mailto:${email}`} aria-label="Email Me">
                <Mail className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
