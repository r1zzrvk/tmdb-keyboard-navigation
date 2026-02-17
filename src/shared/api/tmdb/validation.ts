import { z } from 'zod'

/**
 * @see https://developer.themoviedb.org/reference/movie-details
 */

export const tmdbMovieSchema = z.object({
  id: z.number(),
  title: z.string().default('Untitled'),
  overview: z.string().nullable().optional().default(null),
  poster_path: z.string().nullable().optional().default(null),
  backdrop_path: z.string().nullable().optional().default(null),
  release_date: z.string().nullable().optional().default(null),
  vote_average: z.number().nullable().optional().default(null),
  adult: z.boolean().nullable().optional().default(null),
  budget: z.number().nullable().optional().default(null),
  genres: z.array(z.object({ id: z.number(), name: z.string() })).nullable().optional().default(null),
  original_language: z.string().nullable().optional().default(null),
  runtime: z.number().nullable().optional().default(null),
  tagline: z.string().nullable().optional().default(null),
  vote_count: z.number().nullable().optional().default(null),
})

export const tmdbPagedSchema = <T extends z.ZodTypeAny>(item: T) =>
  z.object({
    page: z.number(),
    results: z.array(item),
    total_pages: z.number(),
    total_results: z.number(),
  })
