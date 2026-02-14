export type LoadPopularAction = {
  type: 'movies/loadPopular'
  payload: { page: number }
}

export type LoadNowPlayingAction = {
  type: 'movies/loadNowPlaying'
  payload: { page: number }
}

export type LoadSearchAction = {
  type: 'movies/loadSearch'
  payload: { query: string; page: number }
}

export type LoadDetailsAction = {
  type: 'movies/loadDetails'
  payload: { id: number }
}

export type MovieAction = LoadPopularAction | LoadNowPlayingAction | LoadSearchAction | LoadDetailsAction

export const moviesApiActions = {
  loadPopular: (page: number): LoadPopularAction => ({
    type: 'movies/loadPopular',
    payload: { page },
  }),
  loadNowPlaying: (page: number): LoadNowPlayingAction => ({
    type: 'movies/loadNowPlaying',
    payload: { page },
  }),
  loadSearch: (query: string, page: number): LoadSearchAction => ({
    type: 'movies/loadSearch',
    payload: { query, page },
  }),
  loadDetails: (id: number): LoadDetailsAction => ({
    type: 'movies/loadDetails',
    payload: { id },
  }),
}
