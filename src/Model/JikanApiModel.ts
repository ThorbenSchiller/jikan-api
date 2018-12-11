export enum JikanApiType {
    ANIME = "anime",
    MANGA = "manga",
    PERSON = "person",
    CHARACTER = "character",
}

export enum JikanDetailedType {
    TV = "tv",
    OVA = "ova",
    MOVIE = "movie",
    SPECIAL = "special",
    ONA = "ona",
    MUSIC = "music",
    MANGA = "manga",
    NOVEL = "novel",
    ONESHOT = "oneshot",
    DOUJIN = "doujin",
    MANHWA = "manhwa",
    MANHUA = "manhua",
}

export interface JikanApiError {
    error: string;
}

export const isErrorResponse = (response: object): response is JikanApiError => {
    return response && `error` in response;
};

export interface JikanCacheInformation {
    request_hash: string;
    request_cached: boolean;
    request_cache_expiry: number;
}
