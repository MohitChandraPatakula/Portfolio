import { resumeData } from "@/data/resume-data";
import ProjectCard from "@/components/ui/ProjectCard";

export default function ProjectsSection() {
  const { projects } = resumeData;

  return (
    <section id="projects" className="bg-background dark:bg-background">
      <div className="container mx-auto px-4">
        <h2 className="section-title font-headline">My Projects</h2>
        <p className="section-subtitle">
          Explore some of the key projects I've developed, showcasing practical application of my skills.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              animationDelay={`${index * 150}ms`} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
