import Link from "next/link";
import { resumeData } from "@/data/resume-data";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const { name, email, linkedin, github } = resumeData.contactInfo;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-popover/50 border-t border-border/50 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"> {/* Adjusted to md:grid-cols-2 */}
          
          <div className="text-center md:text-left text-sm text-muted-foreground"> {/* Adjusted for potentially 2-col layout */}
            <p>&copy; {currentYear} {name}. All rights reserved.</p>
            <p>Crafted with <Link href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent underline">Next.js</Link> & <Link href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent underline">Tailwind CSS</Link>.</p>
          </div>

          <div className="flex justify-center md:justify-end space-x-6">
            {linkedin && (
              <Link href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-muted-foreground hover:text-primary transition-transform duration-300 transform hover:scale-125">
                <Linkedin className="h-6 w-6" />
              </Link>
            )}
            {github && (
              <Link href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="text-muted-foreground hover:text-primary transition-transform duration-300 transform hover:scale-125">
                <Github className="h-6 w-6" />
              </Link>
            )}
            {email && (
              <Link href={`mailto:${email}`} aria-label="Email Me" className="text-muted-foreground hover:text-primary transition-transform duration-300 transform hover:scale-125">
                <Mail className="h-6 w-6" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
