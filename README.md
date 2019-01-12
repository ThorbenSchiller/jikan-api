# Jikan Api
This packages provides a client to fetch information from https://jikan.moe.

## Usage
To invoke a fetcher, install [typescript-ioc](https://www.npmjs.com/package/typescript-ioc).
Then, bind the preferred fetcher and the response factory via the IoC Container:

```typescript
import {Container, Scope} from "typescript-ioc";
import {
    DefaultResponseFactory,
    Fetcher,
    NodeFetchFetcher,
    ResponseFactory
} from "@thorbens/fetcher/dist";

// bind fetcher & response factory
Container.bind(Fetcher).to(NodeFetchFetcher).scope(Scope.Singleton);
Container.bind(ResponseFactory).to(DefaultResponseFactory).scope(Scope.Singleton);
```

## Example
Example for fetching detail information of the anime https://myanimelist.net/anime/1/Cowboy_Bebop:

```typescript
// fetches detail information for https://myanimelist.net/anime/1/Cowboy_Bebop
const detail: JikanApiAnimeModel = await this.apiClient.getDetail(1);
```
