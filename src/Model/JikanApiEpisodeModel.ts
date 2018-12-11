import {JikanApiAiredModel} from "./JikanApiAiredModel";
import {JikanCacheInformation} from "./JikanApiModel";

export interface JikanApiEpisodesResponse extends JikanCacheInformation {
    episodes_last_page: number;
    episodes: JikanApiEpisodeModel[];
}

export interface JikanApiEpisodeModel {
    episode_id: number;
    title: string;
    title_japanese: string | null;
    title_romanji: string | null;
    aired: JikanApiAiredModel | null;
    filler: boolean;
    recap: boolean;
    video_url: string;
    forum_url: string;
}
