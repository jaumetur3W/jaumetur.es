// 1. Import utilities from `astro:content` and `astro/zod`
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 2. Define your collection(s)
const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    snippet: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    publishDate: z.coerce.date(),
    author: z.string().default('Jaume Tur'),
    category: z.string(),
    tags: z.array(z.string()),
    lang: z.enum(['ca', 'es']).default('ca').optional(),
    canonicalUrl: z.string().optional(),
  }),
});

const teamCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/team' }),
  schema: z.object({
    draft: z.boolean(),
    name: z.string(),
    title: z.string(),
    avatar: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    publishDate: z.coerce.date(),
  }),
});

const projectesCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projectes' }),
  schema: z.object({
    draft: z.boolean().default(false),
    title: z.string(),
    subtitle: z.string(),
    tagline: z.string(),
    icon: z.string(),
    color: z.string().default("indigo"),
    role: z.string(),
    year: z.string(),
    client: z.string(),
    badge: z.string(),
    statLabel: z.string(),
    statValue: z.string(),
    verificationMethod: z.string(),
    liveUrl: z.string().optional(),
    githubUrl: z.string().optional(),
    stack: z.array(z.string()),
    order: z.number().default(1),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  'blog': blogCollection,
  'team': teamCollection,
  'projectes': projectesCollection,
};
