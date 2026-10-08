import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const hobbies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/hobbies' }),
  schema: z.object({
    name: z.string(), category: z.string(), emoji: z.string(), intro: z.string(),
    budget: z.string(), budgetLevel: z.enum(['free','low','medium','high']),
    difficulty: z.enum(['easy','medium','hard']),
    setting: z.array(z.string()), mode: z.array(z.string()), tags: z.array(z.string()),
    threeMinuteTry: z.string(), weeklyTime: z.string().optional(), suitableFor: z.string().optional(), level: z.enum(['basic','guide']), image: z.string().optional(),
    benefits: z.array(z.string()), cautions: z.array(z.string()),
    steps: z.array(z.string()), resources: z.array(z.object({ name: z.string(), url: z.string().url(), note: z.string(), kind: z.string() })).default([]),
    featured: z.boolean().default(false), updated: z.coerce.date(),
  }),
});
export const collections = { hobbies };
