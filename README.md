# Jikan Api

This package provides a javascript client to fetch information from https://jikan.moe.

TypeDoc is available at https://thorbens.gitlab.io/anime/jikan-api.

## Usage

The api client relies on [fetch](https://www.npmjs.com/package/node-fetch) and is intended for server side use.
All options for the constructor are optional.

```typescript
import { JikanApiClient } from "@thorbens/jikan-api";

const apiClient = new JikanApiClient();
```

## Example

Example for fetching detail information of the anime https://myanimelist.net/anime/1/Cowboy_Bebop:

```typescript
// fetches detail information for https://myanimelist.net/anime/1/Cowboy_Bebop
const detail = await apiClient.getDetail(1); // return a JikanApiAnimeModel
```

## Custom endpoint

To change the jikan endpoint, pass the endpoint url as second parameters:

```typescript
import {JikanApiClient} from "@thorbens/jikan-api";

const endpointUrl = "https://exmaple.com/v3"; // no tailing slash
const apiClient = new JikanApiClient({endpointUrl);
```

See https://github.com/jikan-me/jikan-rest for hosting your own endpoint.

## Logging

By default, logging will be performed on the console.
To use a custom logger, implement the interface of [@thorben/logger-model](https://gitlab.com/thorbens/logger-model)
and pass it to the api client:

```typescript
import {Logger} from "@thorbens/logger-model";

class CustomLogger implements Logger {
    ...
}
const apiClient = new JikanApiClient({logger: new CustomLogger()});
```
