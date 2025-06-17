"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Briefcase, Code, Zap, MessageSquare, User, Award, HomeIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#hero", label: "Home", icon: HomeIcon },
  { href: "#experience", label: "Experience", icon: Briefcase },
  { href: "#skills", label: "Skills", icon: Zap },
  { href: "#projects", label: "Projects", icon: Code },
  { href: "#certifications", label: "Certs", icon: Award },
  { href: "#contact", label: "Contact", icon: MessageSquare },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#hero");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Trigger earlier for effect

      let currentSection = "";
      // Iterate backwards to prioritize sections lower on the page if multiple are in view
      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const section = document.querySelector(item.href) as HTMLElement;
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          // Consider a section active if its top is within a range from the top of the viewport
          // or if the viewport is within the section itself
          if (window.scrollY >= sectionTop - sectionHeight / 2 && window.scrollY < sectionTop + sectionHeight / 2) {
            currentSection = item.href;
            break; 
          }
        }
      }
      if (!currentSection && window.scrollY < 200) currentSection = "#hero"; // Default to hero if near top
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLinks = ({ onItemClick }: { onItemClick?: () => void }) => (
    <>
      {navItems.map((item) => (
        <Button
          key={item.label}
          variant="ghost"
          asChild
          className={cn(
            "text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-110 hover:text-primary",
            activeSection === item.href 
              ? "text-primary font-semibold border-b-2 border-primary scale-105" 
              : "text-muted-foreground dark:text-slate-300",
            "dark:hover:text-primary-foreground dark:data-[active=true]:text-primary-foreground",
            "px-3 py-2 md:px-4" 
          )}
          data-active={activeSection === item.href}
          onClick={() => {
            if (onItemClick) onItemClick();
            // Manually update active section on click for immediate feedback
            // setActiveSection(item.href); // This might be too aggressive if scroll handler is efficient
          }}
        >
          <Link href={item.href}>
            <item.icon className="mr-2 h-4 w-4 md:hidden" />
            {item.label}
          </Link>
        </Button>
      ))}
    </>
  );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "bg-background/90 backdrop-blur-lg shadow-lg dark:bg-background/80" : "bg-transparent dark:bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="#hero" className="flex items-center gap-2 group">
          <Zap className="h-7 w-7 text-primary group-hover:text-accent transition-colors duration-300 group-hover:animate-pulseGlow" />
          <span className="text-xl font-headline font-bold text-primary group-hover:text-accent transition-colors duration-300">MotionFolio</span>
        </Link>
        <nav className="hidden items-center space-x-1 md:flex">
          <NavLinks />
        </nav>
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="border-primary/50 text-primary hover:bg-primary/10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background p-6 dark:bg-popover">
              <Link href="#hero" className="flex items-center gap-2 mb-8" onClick={() => setIsSheetOpen(false)}>
                <Zap className="h-7 w-7 text-primary" />
                <span className="text-xl font-headline font-bold text-primary">MotionFolio</span>
              </Link>
              <nav className="flex flex-col space-y-3">
                 <NavLinks onItemClick={() => setIsSheetOpen(false)} />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
