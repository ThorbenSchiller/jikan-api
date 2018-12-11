import {JikanApiAnimeModel} from "./JikanApiAnimeModel";

export type JikanSeasonType = "summer" | "spring" | "fall" | "winter";

export interface JikanApiSeasonModel {
    season_name: "Winter" | "Summer" | "Spring" | "Fall";
    season_year: number;
    anime: JikanApiAnimeModel[];
}
