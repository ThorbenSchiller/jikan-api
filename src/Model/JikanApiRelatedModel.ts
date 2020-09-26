import { JikanApiType } from "./JikanApiModel";

/**
 * Model for a relation to another element (anime, manga, etc.(
 */
export interface JikanApiRelatedModel {
  /**
   * The MyAnimeList id of the related element.
   */
  mal_id: number;
  /**
   * The type of the related element.
   */
  type: JikanApiType;
  /**
   * The name (title) of the related element.
   *
   * @example Cowboy Bebop: Tengoku no Tobira"
   */
  name: string;
  /**
   * The MyAnimeList url to the related element.
   *
   * @example https://myanimelist.net/anime/5/Cowboy_Bebop__Tengoku_no_Tobira
   */
  url: string;
}
