import {AxiosFetcher} from "@thorbens/fetcher/dist/AxiosFetcher";
import {DefaultResponseFactory} from "@thorbens/fetcher/dist/DefaultResponseFactory";
import {Fetcher} from "@thorbens/fetcher/dist/Fetcher";
import {ResponseFactory} from "@thorbens/fetcher/dist/ResponseFactory";
import {Container} from "typescript-ioc";
import {JikanApiClient} from "./JikanApiClient";
import {JikanApiAiringStatus} from "./Model/JikanApiAiringStatus";
import {JikanApiType} from "./Model/JikanApiModel";

describe("JikanApiClient", () => {
    beforeAll(() => {
        Container.bind(ResponseFactory).to(DefaultResponseFactory);
        Container.bind(Fetcher).to(AxiosFetcher);
    });

    it("should fetch the correct info", async () => {
        const apiClient: JikanApiClient = Container.get(JikanApiClient);
        const response = await apiClient.getDetail(1);

        expect(!!response).toEqual(true);

        expect(response.mal_id).toEqual(1);
        expect(response.url).toEqual(`https://myanimelist.net/anime/1/Cowboy_Bebop`);
        expect(response.image_url).toEqual(`https://myanimelist.cdn-dena.com/images/anime/4/19644.jpg`);
        expect(response.trailer_url).toEqual(
            `https://www.youtube.com/embed/qig4KOK2R2g?enablejsapi=1&wmode=opaque&autoplay=1`,
        );
        expect(response.title).toEqual(`Cowboy Bebop`);
        expect(response.title_english).toEqual(`Cowboy Bebop`);
        expect(response.title_japanese).toEqual(`カウボーイビバップ`);
        expect(response.type).toEqual(`TV`);
        expect(response.source).toEqual(`Original`);
        expect(response.episodes).toEqual(26);
        expect(response.status).toEqual(JikanApiAiringStatus.FINISHED_AIRING);
        expect(response.airing).toEqual(false);
        expect(response.rating).toEqual(`R - 17+ (violence & profanity)`);
    });

    it("should perform a search request", async () => {
        const apiClient: JikanApiClient = Container.get(JikanApiClient);
        const searchTerm = `attack on titan`;
        const response = await apiClient.search(searchTerm, JikanApiType.ANIME);

        expect(!!response).toEqual(true);
    });

    it("should perform a recommendation request", async () => {
        const apiClient: JikanApiClient = Container.get(JikanApiClient);
        const response = await apiClient.getRecommendations(1);

        expect(!!response).toEqual(true);
        expect(response.recommendations.length > 0).toEqual(true);
    });

    it("should perform a reviews request", async () => {
        const apiClient: JikanApiClient = Container.get(JikanApiClient);
        const response = await apiClient.getReviews(1);

        expect(!!response).toEqual(true);
        expect(response.reviews.length > 0).toEqual(true);
    });
});
