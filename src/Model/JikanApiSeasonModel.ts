import {JikanApiAnimeModel} from "./JikanApiAnimeModel";

/**
 * Available seasons that can be requested.
 */
export type JikanSeasonType = "summer" | "spring" | "fall" | "winter";

/**
 * Model for a season response.
 */
export interface JikanApiSeasonModel {
    /**
     * The name of the season.
     */
    season_name: "Winter" | "Summer" | "Spring" | "Fall";
    /**
     * The year of the season.
     */
    season_year: number;
    /**
     * Animes that belong to this season.
     */
    anime: JikanApiAnimeModel[];
}
