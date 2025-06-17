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
        <div className="relative wrap overflow-hidden p-2 sm:p-5">
          <div 
            className="absolute border-opacity-20 border-gray-700 dark:border-gray-300 h-full border-2 border-dashed" 
            style={{ left: '50%', borderColor: 'hsl(var(--primary)/0.3)' }}
          ></div>
          {experience.map((item, index) => (
            <TimelineItem 
              key={index} 
              item={item} 
              isLeft={index % 2 !== 0} 
              animationDelay={`${index * 100}ms`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
