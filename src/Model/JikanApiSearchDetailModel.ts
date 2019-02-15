import {JikanApiAnimeGenre} from "./JikanApiAnimeGenre";
import {JikanCacheInformation, JikanDetailedType} from "./JikanApiModel";
import {JikanApiRating} from "./JikanApiRating";

/**
 * Search options for a search request.
 *
 * @see {@link https://jikan.docs.apiary.io/#reference/0/search/search-request-example+schema?console=1}
 */
export interface JikanSearchOptions {
    /**
     * Page number.
     */
    page?: number;
    /**
     * Filter status of results.
     */
    status?: "airing" | "completed" | "complete" | "tba" | "upcoming";
    /**
     * Filter type of results.
     */
    type?: JikanDetailedType;
    /**
     * Filter genre of results.
     */
    genre?: JikanApiAnimeGenre;
    /**
     * Filter rating of results.
     */
    rated?: JikanApiRating;
    /**
     * Set to true, to exclude genres listed in {@link genre}.
     */
    genre_exclude?: boolean;
    /**
     * The ISO8601 start date used for filtering results.
     */
    start_date?: string;
    /**
     * The ISO8601 end date used for filtering results.
     */
    end_date?: string;
}

/**
 * Model for a search response.
 */
export interface JikanApiSearchModel extends JikanCacheInformation {
    results: JikanApiSearchDetailModel[];
    last_page: number;
}

/**
 * Model for an anime inside a search response.
 */
interface JikanApiSearchDetailModel {
    mal_id: number;
    url: string;
    image_url: string;
    title: string;
    airing: boolean;
    synopsis: string;
    type: JikanDetailedType;
    /**
     * 0 if episodes are unknown.
     */
    episodes: number;
    score: number;
    start_date: string | null;
    end_date: string | null;
    members: number;
    rated: string;
}
