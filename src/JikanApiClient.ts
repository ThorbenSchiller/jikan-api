import {Fetcher} from "@thorbens/fetcher";
import {Inject} from "typescript-ioc";
import {JikanApiAnimeModel} from "./Model/JikanApiAnimeModel";
import {JikanApiEpisodeModel, JikanApiEpisodesResponse} from "./Model/JikanApiEpisodeModel";
import {isErrorResponse, JikanApiError, JikanApiType} from "./Model/JikanApiModel";
import {JikanApiRecommendationsResponse} from "./Model/JikanApiRecommendationModel";
import {JikanApiReviewsResponse} from "./Model/JikanApiReviewModel";
import {JikanApiSearchModel, JikanSearchOptions} from "./Model/JikanApiSearchDetailModel";
import {JikanApiSeasonModel, JikanSeasonType} from "./Model/JikanApiSeasonModel";

/**
 * Implementation of a Http Client for the Jikan MyAnimeList Api.
 *
 * @see {@link https://jikan.docs.apiary.io/}
 */
export class JikanApiClient {
    /**
     * The fetcher used to perform http requests.
     */
    @Inject
    private fetcher!: Fetcher;
    /**
     * Endpoint url (without tailing slash).
     */
    private readonly endpointUrl: string;

    /**
     * Creates a new instance for this class.
     * No further methods are called in the constructor.
     *
     * @param endpointUrl The endpoint url to use.
     */
    constructor(endpointUrl?: string) {
        this.endpointUrl = endpointUrl || this.getDefaultUrl();
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
    public async getDetail(id: number): Promise<JikanApiAnimeModel> {
        const url = `${this.endpointUrl}/anime/${id}`;
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
    public async getEpisodes(id: number, page: number = 1): Promise<JikanApiEpisodesResponse> {
        const url = `${this.endpointUrl}/anime/${id}/episodes/${page}`;
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
        const firstPage = await this.getEpisodes(id);
        episodes.push(...firstPage.episodes);
        if (firstPage.episodes_last_page > 1) {
            // retrieve other pages as well
            for (let page = 2; page < firstPage.episodes_last_page; page++) {
                const nextPage = await this.getEpisodes(id, page);
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
    public async getReviews(id: number, page: number = 1): Promise<JikanApiReviewsResponse> {
        const url = `${this.endpointUrl}/anime/${id}/reviews/${page}`;
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
    public async getRecommendations(id: number): Promise<JikanApiRecommendationsResponse> {
        const url = `${this.endpointUrl}/anime/${id}/recommendations`;
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
    public async getSeason(year: number, season: JikanSeasonType): Promise<JikanApiSeasonModel> {
        const url = `${this.endpointUrl}/season/${year}/${season}`;
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
    public async search(query: string, type: JikanApiType,
                        options: JikanSearchOptions = {}): Promise<JikanApiSearchModel> {
        // get keys from options
        const keys = Object.keys(options) as Array<keyof JikanSearchOptions>;
        // build query string
        const queryString = keys.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(`${options[key]}`)}`)
            .join("&");
        // create final url
        const url = `${this.endpointUrl}/search/${type}?q=${query}&${queryString}`;
        // fetch response from api
        return this.performRequest<JikanApiSearchModel>(url);
    }

    /**
     * Returns the default api url to use of no url is given in the constructor.
     * Overwrite this function in an extended class to change the used default url.
     *
     * @returns The default api url to use of no url is given in the constructor.
     */
    protected getDefaultUrl(): string {
        return `https://api.jikan.moe/v3`;
    }

    /**
     * Fetches the given api url and returns the type T.
     * If the response is an error, the promise is rejected.
     *
     * @param url The url to fetch.
     * @returns The typed response from the request.
     */
    private async performRequest<T extends object>(url: string): Promise<T> {
        const response = await this.fetcher.fetch(url);
        const responseObject = response.asJSON<JikanApiError | T>();
        if (isErrorResponse(responseObject)) {
            return Promise.reject(new Error(responseObject.error));
        }

        return responseObject;
    }
}
