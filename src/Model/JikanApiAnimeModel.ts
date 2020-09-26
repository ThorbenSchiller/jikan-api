import { JikanApiAiredModel } from "./JikanApiAiredModel";
import { JikanApiAiringStatus } from "./JikanApiAiringStatus";
import { JikanApiCommonAnimeModel } from "./JikanApiCommonAnimeModel";
import { JikanApiRelatedModel } from "./JikanApiRelatedModel";
import { JikanApiSourceModel } from "./JikanApiSourceModel";

/**
 * Model for a relation map where the key describes the relation type and the value
 * holds the relation information.
 */
interface JikanApiRelationMap {
  /**
   * @example
   * Example object of a relation:
   * ```javascript
   * {
   *  "Side story": [{
   *      mal_id: 5,
   *      type: "anime",
   *      name: "Cowboy Bebop: Tengoku no Tobira",
   *      url: "https://myanimelist.net/anime/5/Cowboy_Bebop__Tengoku_no_Tobira"
   *  }]
   * }```
   */
  [relationType: string]: JikanApiRelatedModel[];
}

/**
 * Model for an anime.
 */
export interface JikanApiAnimeModel extends JikanApiCommonAnimeModel {
  /**
   * The url to a (youtube) trailer video.
   *
   * @example https://www.youtube.com/embed/qig4KOK2R2g?enablejsapi=1&wmode=opaque&autoplay=1
   */
  trailer_url: string;
  /**
   * The english title.
   * If no english title is given, this propery is null.
   *
   * @example Cowboy Bebop
   */
  title_english: string | null;
  /**
   * The japanese title.
   *
   * @example カウボーイビバップ
   */
  title_japanese: string;
  /**
   * Synonyms for this anime.
   */
  title_synonyms: string[];
  /**
   * The source of this anime.
   */
  source: JikanApiSourceModel;
  /**
   * The airing status for this anime.
   */
  status: JikanApiAiringStatus;
  /**
   * Indicator if this anime is airing.
   */
  airing: boolean;
  /**
   * The airing times for this anime.
   */
  aired: JikanApiAiredModel | null;
  /**
   * Readable duration of an episode.
   *
   * @example 24 min per ep
   */
  duration: string | null;
  /**
   * Readable age rating for this anime.
   *
   * @example R - 17+ (violence & profanity)
   */
  rating: string | null;
  /**
   * Number of users who gave a rating.
   */
  scored_by: number | null;
  /**
   * Global myanimelist rank for this anime.
   */
  rank: number | null;
  /**
   * The popularity for this anime.
   */
  popularity: number;
  /**
   * The number of favorites this anime has.
   */
  favorites: number;
  /**
   * Background information for this anime (english).
   * If no background is provided, this property is null.
   */
  background: string | null;
  /**
   * The season this anime was aired.
   *
   * @example Spring 1998
   */
  premiered: string;
  /**
   * Broadcast time for this anime.
   * If no broadcast information is available, the value will be "unknown".
   *
   * @example Saturdays at 01:00 (JST)
   * @example Unknown
   */
  broadcast: string;
  /**
   * Related animes described in a relation map.
   */
  related: JikanApiRelationMap;
  /**
   * A list of producers for this anime.
   */
  producers: JikanApiRelatedModel[];
  /**
   * The studios which worked on this anime.
   */
  studios: JikanApiRelatedModel[];
  /**
   * A list of licensors.
   */
  licensors: JikanApiRelatedModel[];
  /**
   * List of opening themes for this anime
   *
   * @example ```javascript
   * ['"Tank!" by The Seatbelts (eps 1-25)']```
   */
  opening_themes: string[];
  /**
   * List of ending themes for this anime
   *
   * @example ```javascript
   * ['"The Real Folk Blues" by The Seatbelts feat. Mai Yamane (eps 1-12, 14-25)',
   * '"Space Lion" by The Seatbelts (ep 13)',
   * '"Blue" by The Seatbelts feat. Mai Yamane (ep 26)']```
   */
  ending_themes: string[];
}
