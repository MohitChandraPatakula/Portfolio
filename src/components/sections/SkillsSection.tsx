import { resumeData } from "@/data/resume-data";
import SkillBar from "@/components/ui/SkillBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SkillsSection() {
  const { skills } = resumeData;

  return (
    <section id="skills" className="bg-secondary/30 dark:bg-secondary/10">
      <div className="container mx-auto px-4">
        <h2 className="section-title font-headline">My Skills</h2>
        <p className="section-subtitle">
          A showcase of my technical expertise and capabilities.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((category) => (
            <Card key={category.name} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl font-headline text-center text-primary">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {category.skills.map((skill) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level || 80} />
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
