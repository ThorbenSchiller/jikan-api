import {JikanApiAiredModel} from "./JikanApiAiredModel";
import {JikanApiAiringStatus} from "./JikanApiAiringStatus";
import {JikanApiType, JikanCacheInformation, JikanDetailedType} from "./JikanApiModel";

/**
 * Model for an anime.
 */
export interface JikanApiAnimeModel extends JikanCacheInformation {
    /**
     * MyAnimeList id.
     */
    mal_id: number;
    /**
     * The myanimelist url to this anime
     *
     * @example https://myanimelist.net/anime/1/Cowboy_Bebop
     */
    url: string;
    /**
     * The url to the cover image.
     *
     * @example https://cdn.myanimelist.net/images/anime/4/19644.jpg
     */
    image_url: string;
    /**
     * The url to a (youtube) trailer video.
     *
     * @example https://www.youtube.com/embed/qig4KOK2R2g?enablejsapi=1&wmode=opaque&autoplay=1
     */
    trailer_url: string;
    /**
     * The official title (can be japanese title in romaji).
     *
     * @example Cowboy Bebop
     */
    title: string;
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
     * The type of this anime.
     */
    type: JikanDetailedType;
    /**
     * The source of this anime.
     */
    source: string;
    /**
     * The number of episodes.
     * If the number is unknown, this property is null.
     */
    episodes: number | null;
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
     * Median user based rating.
     * Likely to be a double value.
     * If no score is available, this property is null.
     *
     * @example 8.81
     */
    score: number | null;
    /**
     * Number of users who gave a rating.
     */
    scored_by: number;
    /**
     * Global myanimelist rank for this anime.
     */
    rank: number | null;
    popularity: number;
    members: number;
    favorites: number;
    /**
     * A synopsis for this anime (english).
     */
    synopsis: string;
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
    related: JikanRelationMap;
    producers: JikanRelatedModel[];
    licensors: JikanRelatedModel[];
    studios: JikanRelatedModel[];
    genres: JikanRelatedModel[];
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

/**
 * Model for a relation map where the key describes the relation type and the value
 * holds the relation information.
 */
interface JikanRelationMap {
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
    [relationType: string]: JikanRelatedModel[];
}

/**
 * Model for a relation to another element (anime, manga, etc.(
 */
export interface JikanRelatedModel {
    /**
     * The MyAnimeList id of the related element.
     */
    mal_id: number;
    /**
     * The type of the related element.
     */
    type: JikanApiType;
    /**
     * The name (title) of the related element.
     *
     * @example Cowboy Bebop: Tengoku no Tobira"
     */
    name: string;
    /**
     * The MyAnimeList url to the related element.
     *
     * @example https://myanimelist.net/anime/5/Cowboy_Bebop__Tengoku_no_Tobira
     */
    url: string;
}
