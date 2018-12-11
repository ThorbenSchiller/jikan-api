import {JikanApiAiredModel} from "./JikanApiAiredModel";
import {JikanApiType, JikanCacheInformation, JikanDetailedType} from "./JikanApiModel";

export interface JikanApiAnimeModel extends JikanCacheInformation {
    mal_id: number;
    url: string;
    image_url: string;
    trailer_url: string;
    title: string;
    title_english: string;
    title_japanese: string;
    title_synonyms: string[];
    type: JikanDetailedType;
    source: string;
    episodes: number | null;
    status: string;
    airing: boolean;
    aired: JikanApiAiredModel | null;
    duration: string | null;
    rating: string;
    score: number;
    scored_by: number;
    rank: number;
    popularity: number;
    members: number;
    favorites: number;
    synopsis: string;
    background: string;
    premiered: string;
    broadcast: string;
    related: { [relationName: string]: JikanRelatedModel[] };
    producers: JikanRelatedModel[];
    licensors: JikanRelatedModel[];
    studios: JikanRelatedModel[];
    genres: JikanRelatedModel[];
    opening_themes: string[];
    ending_themes: string[];
}

export interface JikanRelatedModel {
    mal_id: number;
    type: JikanApiType;
    name: string;
    url: string;
}
