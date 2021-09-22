import { Logger } from "@thorbens/logger-model";
import {
  isErrorResponse,
  JikanApiAnimeModel,
  JikanApiEpisodeModel,
  JikanApiEpisodesResponse,
  JikanApiError,
  JikanApiRecommendationsResponse,
  JikanApiReviewsResponse,
  JikanApiSearchModel,
  JikanApiSeasonModel,
  JikanApiType,
  JikanSearchOptions,
  JikanSeasonType,
} from "./Model";
import { createStackedError } from "./StackedError";
import fetch, { RequestInfo, RequestInit, Response } from "node-fetch";

type FetchApi = (url: RequestInfo, init?: RequestInit) => Promise<Response>;
type FetchApiRequestInfo = RequestInit;

export interface JikanApiClientOptions {
  /**
   * The fetch api used to perform http requests.
   */
  fetchApi?: FetchApi;
  /**
   * Endpoint url (without tailing slash).
   */
  endpointUrl?: string;
  /**
   * The logger used.
   */
  logger?: Logger;
  /**
   * Additional fetch options to pass with each request.
   */
  fetchOptions?: FetchApiRequestInfo;
}

/**
 * Implementation of a Http Client for the Jikan MyAnimeList Api.
 *
 * @see {@link https://jikan.docs.apiary.io/}
 */
export class JikanApiClient {
  /**
   * The fetcher used to perform http requests.
   */
  private readonly fetchApi: FetchApi;
  /**
   * Endpoint url (without tailing slash).
   */
  private readonly endpointUrl: string;
  /**
   * The logger used.
   */
  private readonly logger: Logger;
  /**
   * Additional fetch options to pass with each request.
   */
  private readonly fetchOptions: FetchApiRequestInfo;

  /**
   * Creates a new instance for this class.
   * No further methods are called in the constructor.
   *
   * @param options The api options to use.
   */
  constructor(options: JikanApiClientOptions = {}) {
    const {
      fetchApi = fetch,
      endpointUrl = "https://api.jikan.moe/v3",
      fetchOptions = {},
      logger = console,
    } = options;
    this.fetchApi = fetchApi;
    this.logger = logger;
    this.endpointUrl = endpointUrl;
    this.fetchOptions = fetchOptions;
    this.logger.info(`using jikan endpoint url "${this.endpointUrl}"`);
  }

  /**
   * Fetches detail information about the given anime id.
   * If an error occurred during the request or the id could not be found,
   * the promise is rejected.
   *
   * @param id The anime id to fetch details for.
   * @returns The detail model for the requested id.
   * @see {@link https://jikan.docs.apiary.io/#reference/0/anime}
   */
  public getDetail(id: number): Promise<JikanApiAnimeModel> {
    const url = `${this.endpointUrl}/anime/${id}`;
    this.logger.info(`performing request to ${url}`);
    // fetch response from api
    return this.performRequest<JikanApiAnimeModel>(url);
  }

  /**
   * Fetches episodes information for the given anime id.
   * Episodes are paged. To retrieve all episodes, use {@link getAllEpisodes}.
   * If an error occurred during the request or the id could not be found,
   * the promise is rejected.
   *
   * @param id The anime id to fetch details for.
   * @param page The page to retrieve.
   * @returns The episodes model for the requested id.
   * @see {@link https://jikan.docs.apiary.io/#reference/0/anime}
   */
  public getEpisodes(id: number, page = 1): Promise<JikanApiEpisodesResponse> {
    const url = `${this.endpointUrl}/anime/${id}/episodes/${page}`;
    this.logger.info(`performing request to ${url}`);
    // fetch response from api
    return this.performRequest<JikanApiEpisodesResponse>(url);
  }

  /**
   * Fetches episodes information for the given anime id.
   * Episodes are paged. To retrieve all episodes, use getAllEpisodes.
   *
   * @param id The anime id to fetch details for.
   * @returns The episode models for the requested id.
   * @see {@link https://jikan.docs.apiary.io/#reference/0/anime}
   */
  public async getAllEpisodes(id: number): Promise<JikanApiEpisodeModel[]> {
    const episodes: JikanApiEpisodeModel[] = [];
    let firstPage;
    try {
      firstPage = await this.getEpisodes(id);
    } catch (e) {
      throw createStackedError(
        `failed to fetch first page for episodes for id ${id}`,
        e
      );
    }
    episodes.push(...firstPage.episodes);
    if (firstPage.episodes_last_page > 1) {
      this.logger.debug(
        `got ${firstPage.episodes_last_page} pages, start fetching of remaining pages`
      );
      // retrieve other pages as well
      for (let page = 2; page < firstPage.episodes_last_page; page++) {
        let nextPage;
        try {
          nextPage = await this.getEpisodes(id, page);
        } catch (e) {
          throw createStackedError(
            `failed to fetch episodes for page ${page} for id "${id}"`,
            e
          );
        }
        episodes.push(...nextPage.episodes);
      }
    }

    return episodes;
  }

  /**
   * Returns reviews for the given anime id.
   * Reviews are paged.
   * If an error occurred during the request or the id could not be found,
   * the promise is rejected.
   *
   * @param id The anime id to fetch reviews for.
   * @param page The page to retrieve.
   * @returns The reviews model for the requested id.
   * @see {@link https://jikan.docs.apiary.io/#reference/0/anime}
   */
  public getReviews(id: number, page = 1): Promise<JikanApiReviewsResponse> {
    const url = `${this.endpointUrl}/anime/${id}/reviews/${page}`;
    this.logger.info(`performing request to ${url}`);
    // fetch response from api
    return this.performRequest<JikanApiReviewsResponse>(url);
  }

  /**
   * Returns all recommendations for the given anime id.
   *
   * @param id The anime id to fetch recommendations for.
   * @returns The recommendations model for the requested id.
   * @see {@link https://jikan.docs.apiary.io/#reference/0/anime}
   */
  public getRecommendations(
    id: number
  ): Promise<JikanApiRecommendationsResponse> {
    const url = `${this.endpointUrl}/anime/${id}/recommendations`;
    this.logger.info(`performing request to ${url}`);
    // fetch response from api
    return this.performRequest<JikanApiRecommendationsResponse>(url);
  }

  /**
   * Retrieves animes of the specified season.
   * If an error occurred during the request or the id could not be found,
   * the promise is rejected.
   *
   * @param year Specify the year
   * @param season Specify the season
   * @returns The season model for the requested id.
   * @see {@link https://jikan.docs.apiary.io/#reference/0/season}
   */
  public getSeason(
    year: number,
    season: JikanSeasonType
  ): Promise<JikanApiSeasonModel> {
    const url = `${this.endpointUrl}/season/${year}/${season}`;
    this.logger.info(`performing request to ${url}`);
    // fetch response from api
    return this.performRequest<JikanApiSeasonModel>(url);
  }

  /**
   * Performs a search request for the given query.
   * If an error occurred during the request or the id could not be found,
   * the promise is rejected.
   *
   * @param query For UTF8 characters, percentage encoded and queries including back slashes
   * @param type Specify where to search.
   * @param options Further search options.
   * @returns The search model for the given query.
   * @see {@link https://jikan.docs.apiary.io/#reference/0/search/search-request-example+schema?console=1}
   */
  public search(
    query: string,
    type: JikanApiType,
    options: JikanSearchOptions = {}
  ): Promise<JikanApiSearchModel> {
    // get keys from options
    const keys = Object.keys(options) as (keyof JikanSearchOptions)[];
    // build query string
    const queryString = keys
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(`${options[key]}`)}`
      )
      .join("&");
    // create final url
    const url = `${this.endpointUrl}/search/${type}?q=${query}&${queryString}`;
    this.logger.info(`performing request to ${url}`);
    // fetch response from api
    return this.performRequest<JikanApiSearchModel>(url);
  }

  /**
   * Fetches the given api url and returns the type T.
   * If the response is an error, the promise is rejected.
   *
   * @param url The url to fetch.
   * @returns The typed response from the request.
   * @typeparam T The expected response object.
   */
  private async performRequest<T>(url: string): Promise<T> {
    const response = await this.fetchApi(url, this.fetchOptions);
    let responseObject;
    try {
      responseObject = (await response.json()) as JikanApiError | T;
    } catch (e) {
      throw createStackedError(`failed to parse json: ${response.body}`, e);
    }
    if (!response.ok || isErrorResponse(responseObject)) {
      return Promise.reject(responseObject);
    }

    return responseObject;
  }
}
