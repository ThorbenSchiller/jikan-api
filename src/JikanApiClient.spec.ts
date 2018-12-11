import {Fetcher} from "@thorbens/fetcher";
import {DefaultResponseFactory, NodeFetchFetcher, ResponseFactory} from "@thorbens/fetcher/dist";
import {expect} from "chai";
import {Container, Scope} from "typescript-ioc";
import {JikanApiClient} from "./JikanApiClient";
import {JikanApiType} from "./Model/JikanApiModel";

describe("JikanApiClient", () => {

    beforeAll(() => {
        Container.bind(Fetcher).to(NodeFetchFetcher).scope(Scope.Singleton);
        Container.bind(ResponseFactory).to(DefaultResponseFactory).scope(Scope.Singleton);
    });

    it("should fetch the correct info", async () => {
        const apiClient = new JikanApiClient();
        const response = await apiClient.getDetail(1);

        expect(!!response).to.be.equal(true);

        expect(response.mal_id).to.be.equal(1);
        expect(response.url).to.be.equal(`https://myanimelist.net/anime/1/Cowboy_Bebop`);
        expect(response.image_url).to.be.equal(`https://cdn.myanimelist.net/images/anime/4/19644.jpg`);
        expect(response.trailer_url).to.be.equal(
            `https://www.youtube.com/embed/qig4KOK2R2g?enablejsapi=1&wmode=opaque&autoplay=1`,
        );
        expect(response.title).to.be.equal(`Cowboy Bebop`);
        expect(response.title_english).to.be.equal(`Cowboy Bebop`);
        expect(response.title_japanese).to.be.equal(`カウボーイビバップ`);
        expect(response.type).to.be.equal(`TV`);
        expect(response.source).to.be.equal(`Original`);
        expect(response.episodes).to.be.equal(26);
        expect(response.status).to.be.equal(`Finished Airing`);
        expect(response.airing).to.be.equal(false);
    });

    it("should perform a search request", async () => {
        const apiClient = new JikanApiClient();
        const searchTerm = `attack on titan`;
        const response = await apiClient.search(searchTerm, JikanApiType.ANIME);

        expect(!!response).to.be.equal(true);
    });
});
