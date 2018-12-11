import {Fetcher} from "@thorbens/fetcher";
import {InjectLogger} from "@thorbens/logging";
import {Inject} from "typescript-ioc";
import {Logger} from "winston";
import {JikanApiAnimeModel} from "./Model/JikanApiAnimeModel";
import {JikanApiEpisodeModel, JikanApiEpisodesResponse} from "./Model/JikanApiEpisodeModel";
import {isErrorResponse, JikanApiError, JikanApiType} from "./Model/JikanApiModel";
import {JikanApiSearchModel, JikanSearchOptions} from "./Model/JikanApiSearchDetailModel";
import {JikanApiSeasonModel, JikanSeasonType} from "./Model/JikanApiSeasonModel";

/**
 * Implementation of a Http Client for the Jikan MyAnimeList Api.
 *
 * @see https://jikan.docs.apiary.io/
 */
export class JikanApiClient {
    /**
     * The fetcher used to perform http requests.
     */
    @Inject
    private fetcher!: Fetcher;
    /**
     * The logger for this class.
     */
    @InjectLogger()
    private logger!: Logger;
    /**
     * Endpoint url (without tailing slash)
     */
    private readonly endpointUrl: string;

    /**
     * Creates a new instance for this class.
     * No further methods are called in the constructor.
     *
     * @param endpointUrl The endpoint url to use.
     */
    constructor(endpointUrl?: string) {
        this.endpointUrl = endpointUrl || `https://api.jikan.moe/v3`;
    }

    /**
     * Fetches detail information about the given anime id.
     *
     * @param id The anime id to fetch details for.
     * @see https://jikan.docs.apiary.io/#reference/0/anime
     */
    public async getDetail(id: number): Promise<JikanApiAnimeModel> {
        const url = `${this.endpointUrl}/anime/${id}`;
        this.logger.debug(`performing request to ${url}`);
        const response = await this.fetcher.fetch(url);
        const responseObject = response.asJSON<JikanApiError | JikanApiAnimeModel>();
        if (isErrorResponse(responseObject)) {
            throw new Error(responseObject.error);
        }

        return responseObject;
    }

    /**
     * Fetches episodes information for the given anime id.
     * Episodes are paged. To retrieve all episodes, use getAllEpisodes.
     *
     * @param id The anime id to fetch details for.
     * @param page The page to retrieve.
     * @see https://jikan.docs.apiary.io/#reference/0/anime
     */
    public async getEpisodes(id: number, page: number = 1): Promise<JikanApiEpisodesResponse> {
        const url = `${this.endpointUrl}/anime/${id}/episodes/${page}`;
        this.logger.debug(`performing request to ${url}`);
        const response = await this.fetcher.fetch(url);
        const responseObject = response.asJSON<JikanApiError | JikanApiEpisodesResponse>();
        if (isErrorResponse(responseObject)) {
            throw new Error(responseObject.error);
        }

        return responseObject;
    }

    /**
     * Fetches episodes information for the given anime id.
     * Episodes are paged. To retrieve all episodes, use getAllEpisodes.
     *
     * @param id The anime id to fetch details for.
     * @see https://jikan.docs.apiary.io/#reference/0/anime
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
     * Retrieves animes of the specified season.
     *
     * @param year Specify the year
     * @param season Specify the season
     * @see https://jikan.docs.apiary.io/#reference/0/season
     */
    public async getSeason(year: number, season: JikanSeasonType): Promise<JikanApiSeasonModel> {
        const url = `${this.endpointUrl}/season/${year}/${season}`;
        this.logger.debug(`performing request to ${url}`);

        const response = await this.fetcher.fetch(url);
        const responseObject = response.asJSON<JikanApiError | JikanApiSeasonModel>();
        if (isErrorResponse(responseObject)) {
            throw new Error(responseObject.error);
        }

        return responseObject;
    }

    /**
     * Performs a search request for the given query.
     *
     * @param query For UTF8 characters, percentage encoded and queries including back slashes
     * @param type Specify where to search
     * @param options Further search options
     * @see https://jikan.docs.apiary.io/#reference/0/search/search-request-example+schema?console=1
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
        this.logger.debug(`performing request to ${url}`);
        // fetch response from api
        const response = await this.fetcher.fetch(url);
        const responseObject = response.asJSON<JikanApiError | JikanApiSearchModel>();
        if (isErrorResponse(responseObject)) {
            throw new Error(responseObject.error);
        }

        return responseObject;
    }
}
