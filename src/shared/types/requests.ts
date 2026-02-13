export type ListRequestKind = 'popular' | 'now_playing'
export type DetailRequestKind = 'details'
export type SearchRequestKind = 'search'

export type RequestKind = ListRequestKind | DetailRequestKind | SearchRequestKind

export type RequestParams = Record<string, string | number>
