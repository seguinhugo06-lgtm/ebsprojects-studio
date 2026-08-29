import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      /** Displayed as-is; uppercased by CSS where the design calls for it. */
      title: z.string(),
      client: z.string(),
      location: z.string(),
      services: z.array(z.string()).nonempty(),
      /** Position in the full projects grid. */
      order: z.number(),
      /** Shown in "Selected projects" on the home page. */
      featured: z.boolean().default(false),
      /** 4:3-ish crop used in the projects grid. */
      cover: image(),
      /** Alternate crop used in the expertise listings. */
      thumb: image(),
      /** The three images in the clipped, centred band at the top. */
      strip: z.array(image()).length(3),
      /** The grid below it. Each slot's span and crop ratio were measured on
          the original site — they are imposed by the layout, not the image. */
      grid: z
        .array(
          z.object({
            src: image(),
            span: z.enum(['full', 'half']),
            /** CSS aspect-ratio, e.g. "1265 / 859". */
            ratio: z.string(),
          })
        )
        .nonempty(),
      links: z
        .array(z.object({ label: z.string(), url: z.string().url() }))
        .default([]),
    }),
});

const expertises = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/expertises' }),
  schema: z.object({
    title: z.string(),
    /** Two-digit index shown next to the heading. */
    index: z.string(),
    order: z.number(),
    /** Must match the label used in project `services`. */
    service: z.string(),
  }),
});

export const collections = { projects, expertises };
