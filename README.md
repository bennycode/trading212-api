# Trading 212 API for TypeScript

![Language Details](https://img.shields.io/github/languages/top/bennycode/trading212-api) ![License](https://img.shields.io/npm/l/trading212-api.svg) ![Package Version](https://img.shields.io/npm/v/trading212-api.svg)

---

## Motivation

This [Trading 212](https://www.trading212.com/) API can be used with TypeScript and comes with many useful features such as automatic reconnects and response validation.

## Implemented Endpoints

- [x] [Instruments Metadata](https://t212public-api-docs.redoc.ly/#tag/Instruments-Metadata)
- [ ] Pies
- [x] [Equity Orders](https://t212public-api-docs.redoc.ly/#tag/Equity-Orders)
- [x] [Account Data](https://t212public-api-docs.redoc.ly/#tag/Account-Data)
- [x] [Personal Portfolio](https://t212public-api-docs.redoc.ly/#tag/Personal-Portfolio)
- [x] [Historical items](https://t212public-api-docs.redoc.ly/#tag/Historical-items)

## Features

- ✅ **Documented.** Get started with [demo scripts][1] and [generated documentation][2].
- ✅ **Maintained.** Automated security updates. No threats from outdated dependencies.
- ✅ **Modern.** HTTP client with Promise API. Don't lose yourself in callback hell.
- ✅ **Reliable.** Follows [semantic versioning][3]. Get notified about breaking changes.
- ✅ **Robust.** Automatic requests retries are built-in. No problems if your Wi-Fi is gone.
- ✅ **Tested.** Unit test coverage to guarantee core functionaly.
- ✅ **Typed.** Source code is 100% TypeScript. No need to install external typings.

## Usage

### Installation

**npm**

```bash
npm install trading212-api
```

### REST Example

The [demo section][1] provides many examples on how to use "trading212-api". There is also an automatically generated [API documentation][2]. For a quick start, here is a simple example for a REST request:

```ts
import {APIClient} from 'trading212-api';

const baseURL = APIClient.URL_LIVE;
const client = new APIClient(baseURL, 'apiKey');

const info = await client.rest.account.getInfo();
console.log(info);
```

### Development

If cloning the project locally, you can also add a `.env` file to configure the API client (see [.env.defaults][4]). This allows you to run all demo scripts.

**Example**

```bash
npm run demo:account
```

## Internals

This library utilizes [axios](https://github.com/axios/axios) for HTTP calls. You can configure the axios instance using [interceptors](https://axios-http.com/docs/interceptors) if needed. Retries are handled by [axios-retry](https://github.com/softonic/axios-retry), and payloads are validated with [Zod](https://github.com/colinhacks/zod). Unit tests are implemented with [nock](https://github.com/nock/nock).

## Resources

### Documentation

- [Docs: Trading212 API](https://t212public-api-docs.redoc.ly/)
- [Forum: New Equity Trading API in Beta](https://community.trading212.com/t/61788)
- [Blog: Reverse-Engineered Trading212’s Web APIs](https://haksoat.com/reverse-engineering-trading212/)

### Tools

- [JSON to Zod Schema](https://transform.tools/json-to-zod)
- [OpenAPI Generator: Global Properties](https://openapi-generator.tech/docs/globals/)
- [OpenAPI Generator: Config Options](https://openapi-generator.tech/docs/generators/typescript-fetch/#config-options)

[1]: https://github.com/bennycode/trading212-api/tree/main/src/demo
[2]: https://github.com/bennycode/trading212-api/tree/main/docs
[3]: https://docs.npmjs.com/about-semantic-versioning
[4]: https://github.com/bennycode/trading212-api/blob/main/.env.defaults
