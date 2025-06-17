// use server'
'use server';

/**
 * @fileOverview Generates a tailored elevator pitch based on a resume and target job description.
 *
 * - generateElevatorPitch - A function that generates the elevator pitch.
 * - ElevatorPitchInput - The input type for the generateElevatorPitch function.
 * - ElevatorPitchOutput - The return type for the generateElevatorPitch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ElevatorPitchInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the resume.'),
  jobDescription: z.string().describe('The job description to tailor the elevator pitch towards.'),
});
export type ElevatorPitchInput = z.infer<typeof ElevatorPitchInputSchema>;

const ElevatorPitchOutputSchema = z.object({
  elevatorPitch: z.string().describe('A tailored elevator pitch based on the resume and job description.'),
});
export type ElevatorPitchOutput = z.infer<typeof ElevatorPitchOutputSchema>;

export async function generateElevatorPitch(input: ElevatorPitchInput): Promise<ElevatorPitchOutput> {
  return generateElevatorPitchFlow(input);
}

const elevatorPitchPrompt = ai.definePrompt({
  name: 'elevatorPitchPrompt',
  input: {schema: ElevatorPitchInputSchema},
  output: {schema: ElevatorPitchOutputSchema},
  prompt: `You are a professional resume writer. You will generate an elevator pitch based on the provided resume and job description.

Resume:
{{{resumeText}}}

Job Description:
{{{jobDescription}}}

Elevator Pitch:`,
});

const generateElevatorPitchFlow = ai.defineFlow(
  {
    name: 'generateElevatorPitchFlow',
    inputSchema: ElevatorPitchInputSchema,
    outputSchema: ElevatorPitchOutputSchema,
  },
  async input => {
    const {output} = await elevatorPitchPrompt(input);
    return output!;
  }
);
