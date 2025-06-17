import { resumeData } from "@/data/resume-data";
import SkillBar from "@/components/ui/SkillBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers } from "lucide-react"; // Or any other relevant icon

export default function SkillsSection() {
  const { skills } = resumeData;

  return (
    <section id="skills" className="bg-secondary/30 dark:bg-secondary/10">
      <div className="container mx-auto px-4">
        <h2 className="section-title font-headline">My Skills</h2>
        <p className="section-subtitle">
          A showcase of my technical expertise, tools I master, and methodologies I follow.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((category, catIndex) => (
            <div 
              key={category.name} 
              className="motion-reveal motion-reveal-fadeinup h-full"
              style={{ animationDelay: `${catIndex * 100}ms` }}
            >
              <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-transparent hover:border-primary/30 rounded-lg h-full flex flex-col group">
                <CardHeader className="text-center">
                  <div className="inline-block p-3 bg-primary/10 rounded-full mb-3 group-hover:bg-accent/10 transition-colors duration-300">
                     <Layers className="h-8 w-8 text-primary group-hover:text-accent transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-2xl font-headline text-primary group-hover:text-accent transition-colors duration-300">{category.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow pt-2">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar 
                      key={skill.name} 
                      name={skill.name} 
                      level={skill.level || 80} 
                      animationDelay={`${(catIndex * 100) + (skillIndex * 50)}ms`} // Stagger skill bars too
                    />
                  ))}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
