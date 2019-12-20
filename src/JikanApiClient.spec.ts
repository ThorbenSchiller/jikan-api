import {AxiosFetcher} from "@thorbens/axios-fetcher";
import {instance, mock, verify, when} from "ts-mockito";
import detailResponse from "../testdata/detail-response.json";
import recommendationsResponse from "../testdata/recommendations-response.json";
import reviewsResponse from "../testdata/reviews-response.json";
import searchResponse from "../testdata/search-response.json";
import {JikanApiClient} from "./JikanApiClient";
import {JikanApiAiringStatus, JikanApiType} from "./Model";

const endpointUrl = "https://api.jikan.moe/v3";

describe("JikanApiClient", () => {
    beforeEach(() => {
        // sleep between test to avoid rate limit
        return new Promise(resolve => setTimeout(resolve, 1000));
    });

    it("should fetch the correct info", async () => {
        const fetcherMock = mock(AxiosFetcher);
        const expectedUrl = `${endpointUrl}/anime/1`;
        when(fetcherMock.fetch(expectedUrl))
            .thenResolve({
                asJson: () => detailResponse as any,
                body: JSON.stringify(detailResponse),
                status: 200,
            });
        const fetcher = instance(fetcherMock);
        const apiClient = new JikanApiClient(fetcher, endpointUrl);
        const response = await apiClient.getDetail(1);

        verify(fetcherMock.fetch(expectedUrl));

        expect(!!response).toEqual(true);

        expect(response.mal_id).toEqual(1);
        expect(response.url).toEqual(`https://myanimelist.net/anime/1/Cowboy_Bebop`);
        expect(response.image_url).toEqual(`https://cdn.myanimelist.net/images/anime/4/19644.jpg`);
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
        const searchTerm = `attack on titan`;
        const fetcherMock = mock(AxiosFetcher);
        const expectedUrl = `${endpointUrl}/search/anime?q=${searchTerm}&`;
        when(fetcherMock.fetch(expectedUrl))
            .thenResolve({
                asJson: () => searchResponse as any,
                body: JSON.stringify(searchResponse),
                status: 200,
            });
        const fetcher = instance(fetcherMock);
        const apiClient = new JikanApiClient(fetcher, endpointUrl);
        const response = await apiClient.search(searchTerm, JikanApiType.ANIME);

        verify(fetcherMock.fetch(expectedUrl));

        expect(!!response).toEqual(true);
    });

    it("should perform a recommendation request", async () => {
        const fetcherMock = mock(AxiosFetcher);
        const expectedUrl = `${endpointUrl}/anime/1/recommendations`;
        when(fetcherMock.fetch(expectedUrl))
            .thenResolve({
                asJson: () => recommendationsResponse as any,
                body: JSON.stringify(recommendationsResponse),
                status: 200,
            });
        const fetcher = instance(fetcherMock);
        const apiClient = new JikanApiClient(fetcher, endpointUrl);
        const response = await apiClient.getRecommendations(1);

        verify(fetcherMock.fetch(expectedUrl));

        expect(!!response).toEqual(true);
        expect(response.recommendations.length > 0).toEqual(true);
    });

    it("should perform a reviews request", async () => {
        const fetcherMock = mock(AxiosFetcher);
        const expectedUrl = `${endpointUrl}/anime/1/reviews/1`;
        when(fetcherMock.fetch(expectedUrl))
            .thenResolve({
                asJson: () => reviewsResponse as any,
                body: JSON.stringify(reviewsResponse),
                status: 200,
            });
        const fetcher = instance(fetcherMock);
        const apiClient = new JikanApiClient(fetcher, endpointUrl);
        const response = await apiClient.getReviews(1);

        verify(fetcherMock.fetch(expectedUrl));

        expect(!!response).toEqual(true);
        expect(response.reviews.length > 0).toEqual(true);
    });

    it("should return a correct error response", async () => {
        const fetcherMock = mock(AxiosFetcher);
        const expectedUrl = `${endpointUrl}/anime/34796`;
        const badResponse = {
            error: "404 on https://myanimelist.net/anime/34796/",
            message: "Resource does not exist",
            status: 404,
            type: "BadResponseException",
        };
        when(fetcherMock.fetch(expectedUrl))
            .thenReject({
                asJson: () => badResponse,
                body: JSON.stringify(badResponse),
                status: 404,
            } as any);
        const fetcher = instance(fetcherMock);
        const apiClient = new JikanApiClient(fetcher, endpointUrl);

        expect.assertions(1);
        try {
            await apiClient.getDetail(34796);
        } catch (e) {
            expect(e).toEqual(badResponse);
        }
    });
});
