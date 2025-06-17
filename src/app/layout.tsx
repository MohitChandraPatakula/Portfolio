import type {Metadata} from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { resumeData } from '@/data/resume-data';

export const metadata: Metadata = {
  title: `${resumeData.contactInfo.name} | Software Engineer Portfolio`,
  description: 'Professional portfolio of Mohit Chandra Patakula, a detail-oriented Software Engineer.',
  keywords: "Mohit Chandra Patakula, Software Engineer, Full-Stack Developer, Portfolio, Resume, NextJS, React, TailwindCSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
