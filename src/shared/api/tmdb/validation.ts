import { z } from 'zod'

/**
 * @see https://developer.themoviedb.org/reference/movie-details
 */

// TODO: extend schema to include more movie properties
export const tmdbMovieSchema = z.object({
  id: z.number(),
  title: z.string().default('Untitled'),
  overview: z.string().nullable().optional().default(null),
  poster_path: z.string().nullable().optional().default(null),
  backdrop_path: z.string().nullable().optional().default(null),
  release_date: z.string().nullable().optional().default(null),
  vote_average: z.number().nullable().optional().default(null),
})

export const tmdbPagedSchema = <T extends z.ZodTypeAny>(item: T) =>
  z.object({
    page: z.number(),
    results: z.array(item),
    total_pages: z.number(),
    total_results: z.number(),
  })
