"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Briefcase, Code, Zap, MessageSquare, User, Award } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#hero", label: "About", icon: User },
  { href: "#experience", label: "Experience", icon: Briefcase },
  { href: "#skills", label: "Skills", icon: Zap },
  { href: "#projects", label: "Projects", icon: Code },
  { href: "#certifications", label: "Certifications", icon: Award },
  { href: "#contact", label: "Contact", icon: MessageSquare },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      let currentSection = "";
      navItems.forEach(item => {
        const section = document.querySelector(item.href) as HTMLElement;
        if (section && section.offsetTop <= window.scrollY + 100) {
          currentSection = item.href;
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
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
            "text-sm font-medium transition-colors hover:text-primary",
            activeSection === item.href ? "text-primary font-semibold" : "text-muted-foreground",
            "dark:hover:text-primary-foreground dark:text-slate-300 dark:data-[active=true]:text-primary-foreground"
          )}
          data-active={activeSection === item.href}
        >
          <Link href={item.href} onClick={onItemClick}>
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
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-md dark:bg-background/80" : "bg-transparent dark:bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="#hero" className="flex items-center gap-2">
          <Zap className="h-7 w-7 text-primary" />
          <span className="text-xl font-headline font-bold text-primary">MotionFolio</span>
        </Link>
        <nav className="hidden items-center space-x-2 md:flex">
          <NavLinks />
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background p-6 dark:bg-popover">
              <nav className="mt-8 flex flex-col space-y-3">
                 <NavLinks onItemClick={() => {
                   // Close sheet on item click if Sheet API supports it or manage open state
                 }} />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
