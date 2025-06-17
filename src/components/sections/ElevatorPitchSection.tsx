
"use client";
import { useState, useRef, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Wand2, AlertTriangle } from "lucide-react";
import { generateElevatorPitch, type ElevatorPitchInput } from "@/ai/flows/elevator-pitch";
import { fullResumeText, resumeData } from "@/data/resume-data";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  resumeText: z.string().min(100, "Resume text is too short.").max(15000, "Resume text is too long."),
  jobDescription: z.string().min(50, "Job description is too short.").max(10000, "Job description is too long."),
});

type FormData = z.infer<typeof formSchema>;

export default function ElevatorPitchSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [pitch, setPitch] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    if (currentRef) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            currentRef.classList.add('revealed');
            observer.unobserve(currentRef);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(currentRef);
      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resumeText: fullResumeText,
      jobDescription: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setPitch(null);
    setError(null);
    try {
      const result = await generateElevatorPitch(data as ElevatorPitchInput);
      setPitch(result.elevatorPitch);
    } catch (err) {
      console.error("Error generating pitch:", err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(`Failed to generate pitch: ${errorMessage}`);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to generate pitch: ${errorMessage}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="pitch" ref={sectionRef} className="bg-background dark:bg-background motion-reveal">
      <div className="container mx-auto px-4">
        <h2 className="section-title font-headline">AI Elevator Pitch Generator</h2>
        <p className="section-subtitle">
          Craft a compelling elevator pitch tailored to any job description using your resume.
        </p>
        <Card className="max-w-3xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-primary">Generate Your Pitch</CardTitle>
            <CardDescription>
              Paste your resume (or use the pre-filled one) and the job description below.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="resumeText" className="font-semibold">Your Resume</Label>
                <Textarea
                  id="resumeText"
                  {...register("resumeText")}
                  rows={8}
                  className="bg-secondary/30 dark:bg-muted"
                  placeholder="Paste your resume text here..."
                  aria-invalid={errors.resumeText ? "true" : "false"}
                />
                {errors.resumeText && <p className="text-sm text-destructive">{errors.resumeText.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobDescription" className="font-semibold">Target Job Description</Label>
                <Textarea
                  id="jobDescription"
                  {...register("jobDescription")}
                  rows={8}
                  className="bg-secondary/30 dark:bg-muted"
                  placeholder="Paste the job description here..."
                  aria-invalid={errors.jobDescription ? "true" : "false"}
                />
                {errors.jobDescription && <p className="text-sm text-destructive">{errors.jobDescription.message}</p>}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-stretch gap-4">
              <Button type="submit" disabled={isLoading} size="lg" className="w-full hover:animate-pulseGlow">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-5 w-5" />
                    Generate Elevator Pitch
                  </>
                )}
              </Button>
              
              {error && (
                <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-md text-destructive flex items-start">
                  <AlertTriangle className="h-5 w-5 mr-2 shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {pitch && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold font-headline mb-2 text-primary">Your Generated Elevator Pitch:</h3>
                  <Card className="bg-secondary/30 dark:bg-muted p-4 shadow-inner">
                    <p className="text-foreground whitespace-pre-line">{pitch}</p>
                  </Card>
                </div>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </section>
  );
}
