import { defineCollection, z } from "astro:content";
import { TOPICS } from "./utils";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
  })
});

const challengeCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    state: z.enum(["published", "draft"]),
    description: z.string(),
    level: z.enum(["Beginner", "Intermediate", "Advanced", "Pro"]),
    topics: z.array(z.enum(TOPICS)),
    repository: z.string(),
    coverImage: z.string(),
    previewImage: z.string().optional(),
    starterKit: z.string().optional(),
    mostView: z.boolean().optional(),
  })
})

const authors = defineCollection({
  type: "data",
  schema: z.object({
    fullName: z.string(),
    description: z.string(),
    linkedinUrl: z.string().url().optional(),
    socialUrl: z.string().url().optional(),
  })
})

export const collections = {
  'blog': blogCollection,
  'challenges': challengeCollection,
  'authors': authors,
}