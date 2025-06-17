"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Briefcase, Code, Zap, MessageSquare, User, Award, HomeIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { resumeData } from "@/data/resume-data";

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
      setIsScrolled(window.scrollY > 50);

      let currentNavItemHref = ""; 

      if (window.scrollY < 50) {
        currentNavItemHref = "#hero";
      } else {
        for (let i = navItems.length - 1; i >= 0; i--) {
          const item = navItems[i];
          const sectionElement = document.querySelector(item.href) as HTMLElement;
          if (sectionElement) {
            const sectionTop = sectionElement.offsetTop;
            const sectionHeight = sectionElement.offsetHeight;
            if (window.scrollY >= sectionTop - sectionHeight / 2 &&
                window.scrollY < sectionTop + sectionHeight / 2) {
              currentNavItemHref = item.href;
              break; 
            }
          }
        }
        if (!currentNavItemHref && window.scrollY < 200) {
          currentNavItemHref = "#hero";
        }
      }
      setActiveSection(currentNavItemHref);
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
            "dark:hover:text-primary dark:data-[active=true]:text-primary",
            "px-3 py-2 md:px-4"
          )}
          data-active={activeSection === item.href}
          onClick={() => {
            if (onItemClick) onItemClick();
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
        isScrolled ? "bg-background/90 backdrop-blur-lg shadow-lg dark:bg-popover/80" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Removed branding Link */}
        <div className="flex-1 md:flex-none"></div> {/* Placeholder to help with spacing if needed, or adjust justify-content */}
        <nav className="hidden items-center space-x-1 md:flex">
          <NavLinks />
        </nav>
        <div className="md:hidden ml-auto"> {/* Added ml-auto to push menu to the right if branding is removed */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="border-primary/50 text-primary hover:bg-primary/10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background p-6 dark:bg-popover">
              <div className="mb-8"> {/* Removed branding Link from sheet header */}
                <span className="text-lg font-semibold text-primary">Menu</span>
              </div>
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
