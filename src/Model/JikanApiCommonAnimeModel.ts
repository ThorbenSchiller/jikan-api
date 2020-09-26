import { JikanCacheInformation, JikanDetailedType } from "./JikanApiModel";
import { JikanApiRelatedModel } from "./JikanApiRelatedModel";

/**
 * Common Model for an anime.
 */
export interface JikanApiCommonAnimeModel extends JikanCacheInformation {
  /**
   * MyAnimeList id.
   */
  mal_id: number;
  /**
   * The myanimelist url to this anime
   *
   * @example https://myanimelist.net/anime/1/Cowboy_Bebop
   */
  url: string;
  /**
   * The url to the cover image.
   *
   * @example https://cdn.myanimelist.net/images/anime/4/19644.jpg
   */
  image_url: string;
  /**
   * The official title (can be japanese title in romaji).
   *
   * @example Cowboy Bebop
   */
  title: string;
  /**
   * The type of this anime.
   */
  type: JikanDetailedType;
  /**
   * The number of episodes.
   * If the number is unknown, this property is null.
   */
  episodes: number | null;
  /**
   * Median user based rating.
   * Likely to be a double value.
   * If no score is available, this property is null.
   *
   * @example 8.81
   */
  score: number | null;
  members: number;
  /**
   * A synopsis for this anime (english).
   */
  synopsis: string;
  /**
   * A list of licensors.
   */
  licensors: JikanApiRelatedModel[];
  /**
   * A list of genres.
   */
  genres: JikanApiRelatedModel[];
}
