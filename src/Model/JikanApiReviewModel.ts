import { JikanCacheInformation } from "./JikanApiModel";

/**
 * Model for a reviews response.
 */
export interface JikanApiReviewsResponse extends JikanCacheInformation {
  reviews: JikanApiReviewModel[];
}

/**
 * Model for a review.
 */
export interface JikanApiReviewModel {
  /**
   * The MyAnimeList for the anime this review is created for.
   */
  mal_id: number;
  /**
   * The url to this review.
   */
  url: string;
  /**
   * The number of people who found this review helpful.
   */
  helpful_count: number;
  /**
   * The date string this review was created.
   *
   * @example 2008-08-24T05:46:00+00:00
   */
  date: string;
  /**
   * Information about the reviewer.
   */
  reviewer: {
    url: string;
    image_url: string;
    username: string;
    episodes_seen: number;
    scores: {
      overall: number;
      story: number;
      animation: number;
      sound: number;
      character: number;
      enjoyment: number;
    };
  };
  /**
   * The review text.
   */
  content: string;
}
