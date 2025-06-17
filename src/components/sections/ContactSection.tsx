
"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Send, CheckCircle, AlertTriangle, Mail } from "lucide-react";
import { resumeData } from "@/data/resume-data";
import { useState, useRef, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(50),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters.").max(1000),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const { email: defaultEmail } = resumeData.contactInfo;
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();


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
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setIsLoading(true);
    setIsSuccess(false);
    setError(null);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Contact form submitted:", data);

    const success = Math.random() > 0.2; 
    if (success) {
      setIsSuccess(true);
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
        variant: "default", 
      });
      reset();
    } else {
      setError("Failed to send message. Please try again later or contact me directly at " + defaultEmail);
      toast({
        variant: "destructive",
        title: "Error Sending Message",
        description: "Something went wrong. Please try again or use another contact method.",
      });
    }
    setIsLoading(false);
  };

  return (
    <section id="contact" ref={sectionRef} className="bg-secondary/30 dark:bg-secondary/10 motion-reveal motion-reveal-fadeinup">
      <div className="container mx-auto px-4">
        <h2 className="section-title font-headline">Get In Touch</h2>
        <p className="section-subtitle">
          Have a question, project idea, or just want to connect? I'm excited to hear from you!
        </p>
        <Card className="max-w-xl mx-auto shadow-xl border-transparent hover:border-primary/30 transition-all duration-300 rounded-lg">
          <CardHeader className="text-center">
            <div className="inline-block p-3 bg-primary/10 rounded-full mb-3 mx-auto">
                <Mail className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-headline text-primary">Send Me a Message</CardTitle>
            <CardDescription>
              I'm always open to discussing new opportunities and collaborations.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-semibold text-foreground">Your Name</Label>
                <Input id="name" {...register("name")} placeholder="John Doe" aria-invalid={errors.name ? "true" : "false"} className="focus:border-accent focus:ring-accent" />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-semibold text-foreground">Your Email</Label>
                <Input id="email" type="email" {...register("email")} placeholder="john.doe@example.com" aria-invalid={errors.email ? "true" : "false"} className="focus:border-accent focus:ring-accent"/>
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="font-semibold text-foreground">Your Message</Label>
                <Textarea id="message" {...register("message")} rows={5} placeholder="Hi Mohit, I'd like to discuss..." aria-invalid={errors.message ? "true" : "false"} className="focus:border-accent focus:ring-accent"/>
                {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
              </div>
              <Button type="submit" disabled={isLoading} size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transform hover:scale-105 transition-transform duration-300 focus:ring-primary hover:animate-pulseGlow">
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Send className="mr-2 h-5 w-5" />
                )}
                Send Message
              </Button>

              {isSuccess && (
                <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 rounded-md text-green-700 dark:text-green-300 flex items-center motion-reveal motion-reveal-fadein revealed">
                  <CheckCircle className="h-5 w-5 mr-2 shrink-0" />
                  <p className="text-sm">Your message has been sent successfully! I'll be in touch soon.</p>
                </div>
              )}
              {error && (
                 <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive flex items-start motion-reveal motion-reveal-fadein revealed">
                  <AlertTriangle className="h-5 w-5 mr-2 shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

            </CardContent>
          </form>
        </Card>
      </div>
    </section>
  );
}
