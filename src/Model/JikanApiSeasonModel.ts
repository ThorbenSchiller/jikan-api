import { JikanApiCommonAnimeModel } from "./JikanApiCommonAnimeModel";

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
  anime: JikanApiSeasonAnimeModel[];
}

export interface JikanApiSeasonAnimeModel extends JikanApiCommonAnimeModel {
  /**
   * The airing end date (ISO 8601, UTC).
   *
   * @example 1999-04-24T00:00:00+00:00
   */
  airing_start: string;
  /**
   * If this anime is rated 18.
   */
  r18: boolean;
  /**
   * If this anime is for kids/
   */
  kids: boolean;
  /**
   * If this anime is a leftover from the previous season.
   */
  continuing: boolean;
}
