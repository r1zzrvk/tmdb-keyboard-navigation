# TMDB Keyboard Navigation

Web application for browsing movies from [TMDB](https://www.themoviedb.org/) database with keyboard-only navigation. The application works only on desktop devices (minimum screen width 1024px).

## Getting Started

```bash
# Install dependencies
npm install

# Create environment variables file
cp .env.example .env

# Start dev server
npm run dev
```

## Stack

- React 19
- TypeScript
- Vite
- [Mantine](https://mantine.dev/)
- [Phosphor Icons](https://phosphoricons.com/)
- Redux Toolkit
- Redux Saga
- React Router
- [FSD (Feature-Sliced Design)](https://feature-sliced.design/)

## Architecture

The project uses **Feature-Sliced Design (FSD)** architecture:

```
src/
├── app/
├── pages/
├── widgets/
├── features/
├── entities/
└── shared/
```

## TMDB API Setup

1. Sign up at [TMDB](https://www.themoviedb.org/)
2. Get API token in [account settings](https://www.themoviedb.org/settings/api)
3. Read the [API documentation](https://developer.themoviedb.org/docs)

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_TOKEN=your_api_token_here
```

## Navigation System

The application uses **keyboard-only navigation**:

- **Arrow keys** (`↑`, `↓`, `←`, `→`) — navigate between elements
- **Enter** — activate element (follow link, click button)
- **Escape** — go back or close modal windows
- **Tab** — disabled (navigation only via arrow keys)

Navigation is organized by zones:
- `search` — search field
- `filters` — filters (popular, now playing)
- `grid` — movie grid
- `pagination` — pagination
- `favourites` — favorites button
- `back-button` — back button

## Caching

API requests are cached with **TTL of 60 seconds**:

```typescript
// Example of cache check before request
const existing = yield select(selectMovieQuery(key))

if (existing?.status === 'success' && existing.fetchedAt && Date.now() - existing.fetchedAt < MOVIE_CACHE_TTL) {
  return // Use cached data
}
```

Cache is stored in Redux store and automatically invalidated after TTL expires. This allows:
- Reduce number of API requests
- Improve application performance
- Comply with TMDB API rate limits
