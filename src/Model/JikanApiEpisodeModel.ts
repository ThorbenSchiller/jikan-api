import { JikanApiAiredModel } from "./JikanApiAiredModel";
import { JikanCacheInformation } from "./JikanApiModel";

/**
 * Model for a episodes response.
 */
export interface JikanApiEpisodesResponse extends JikanCacheInformation {
  episodes_last_page: number;
  episodes: JikanApiEpisodeModel[];
}

/**
 * Model for an episode.
 */
export interface JikanApiEpisodeModel {
  /**
   * The episode number.
   */
  episode_id: number;
  /**
   * The (english) title  for this episode.
   *
   * @example Stray Dog Strut
   */
  title: string;
  /**
   * The japanese title for this episode.
   *
   * @example 野良犬のストラット
   */
  title_japanese: string | null;
  /**
   * The japanese title in romaji for this episode.
   *
   * @example Nora Inu no Strut
   */
  title_romanji: string | null;
  /**
   * Airing information for this episode.
   */
  aired: JikanApiAiredModel | null;
  /**
   * Indicator if this episode is a filler.
   */
  filler: boolean;
  /**
   * Indicator if this episode is a recap.
   */
  recap: boolean;
  /**
   * Url to the MyAnimeList episode detail page.
   *
   * @example https://myanimelist.net/anime/1/Cowboy_Bebop/episode/1
   */
  video_url: string;
  /**
   * Url to the MyAnimeList forum page for this episode.
   *
   * @example https://myanimelist.net/forum/?topicid=29264
   */
  forum_url: string;
}
