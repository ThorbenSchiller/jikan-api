# Jikan Api
This packages provides a client to fetch information from https://jikan.moe.

TypeDoc is available on https://thorbens.gitlab.io/anime/jikan-api/.

## Usage
The `JikanApiClient` requires a fetcher from the package [@thorben/fetcher](https://gitlab.com/thorbens/fetcher).
To created a fetcher, a `ResponseFactory` is required.
By default, the `HttpResponseFactory` can be used:

```typescript
import {
    HttpResponseFactory,
    Fetcher,
    NodeFetchFetcher,
    ResponseFactory
} from "@thorbens/fetcher/dist";
import {JikanApiClient} from "@thorbens/jikan-api/dist";

const fetcher = new AxiosFetcher(new HttpResponseFactory());
const apiClient = new JikanApiClient(fetcher);
```

## Example
Example for fetching detail information of the anime https://myanimelist.net/anime/1/Cowboy_Bebop:

```typescript
// fetches detail information for https://myanimelist.net/anime/1/Cowboy_Bebop
const detail: JikanApiAnimeModel = await apiClient.getDetail(1);
```

## Custom endpoint
To change the jikan endpoint, pass the endpoint url as second parameters:
```typescript
const jikanEndpointUrl = "https://exmaple.com/v3"; // no tailing slash
const apiClient = new JikanApiClient(fetcher, jikanEndpointUrl);
```

See https://github.com/jikan-me/jikan-rest for hosting your own endpoint.

## Logging
By default, logging will be performed on the console.
To use a custom logger, implement the interface of [@thorben/logger-model](https://gitlab.com/thorbens/logger-model)
and pass it to the api client:

```typescript
import {Logger} from "@thorbens/logger-model/dist";

class CustomLogger implements Logger {
    ...
}
const apiClient = new JikanApiClient(fetcher, null, customLogger);
```
