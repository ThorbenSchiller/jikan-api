import { JikanCacheInformation } from "./JikanApiModel";

/**
 * Model for a reviews response.
 */
export interface JikanApiRecommendationsResponse extends JikanCacheInformation {
  recommendations: JikanApiRecommendationModel[];
}

/**
 * Model for a recommendation.
 */
export interface JikanApiRecommendationModel {
  /**
   * The MyAnimeList for the anime this review is created for.
   */
  mal_id: number;
  /**
   * The url to the recommended element.
   */
  url: number;
  /**
   * The url to the image of the recommended element.
   */
  image_url: string;
  /**
   * The url to the recommendation.
   */
  recommendation_url: string;
  /**
   * The title of the recommended element.
   */
  title: string;
  /**
   * The number of recommendations for the related element.
   */
  recommendation_count: number;
}
