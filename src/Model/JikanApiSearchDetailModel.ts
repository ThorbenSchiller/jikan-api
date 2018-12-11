import {JikanCacheInformation, JikanDetailedType} from "./JikanApiModel";

/**
 * @see https://jikan.docs.apiary.io/#reference/0/search/search-request-example+schema?console=1
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
     * These values reflect the genre IDs of MyAnimeList.
     */
    genre?: number;
}

export interface JikanApiSearchModel extends JikanCacheInformation {
    results: JikanApiSearchDetailModel[];
    last_page: number;
}

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
