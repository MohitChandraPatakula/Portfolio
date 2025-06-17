import { resumeData } from "@/data/resume-data";
import TimelineItem from "@/components/ui/TimelineItem";

export default function ExperienceSection() {
  const { experience } = resumeData;

  return (
    <section id="experience" className="bg-background dark:bg-background">
      <div className="container mx-auto px-4">
        <h2 className="section-title font-headline">Work Experience</h2>
        <p className="section-subtitle">
          A journey through my professional roles and accomplishments, highlighting key contributions and growth.
        </p>
        <div className="max-w-3xl mx-auto space-y-12">
          {experience.map((item, index) => (
            <TimelineItem 
              key={index} 
              item={item} 
              animationDelay={`${index * 150}ms`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
