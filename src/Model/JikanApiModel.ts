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

/**
 * An api error.
 */
export interface JikanApiError {
    /**
     * The error message.
     */
    error: string;
}

/**
 * Checks if the given response object is an error response.
 *
 * @param response The response object to check.
 */
export function isErrorResponse(response: object): response is JikanApiError {
    return response && `error` in response;
}

/**
 * Interface for cache information in an api response.
 */
export interface JikanCacheInformation {
    /**
     * The request hash.
     *
     * @example request:anime:c8a5be55579a0147b5c455245461fe69a7347e1b
     */
    request_hash: string;
    /**
     * Indicator if the requests was cached.
     */
    request_cached: boolean;
    /**
     * Expire timestamp for the cache.
     */
    request_cache_expiry: number;
}
