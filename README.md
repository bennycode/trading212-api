# Trading 212 API for TypeScript

![Language Details](https://img.shields.io/github/languages/top/bennycode/trading212-api) ![License](https://img.shields.io/npm/l/trading212-api.svg) ![Package Version](https://img.shields.io/npm/v/trading212-api.svg)

---

## Motivation

This [Trading 212](https://www.trading212.com/) API can be used with TypeScript and comes with many useful features such as automatic reconnects and response validation.

## Features

- ✅ **Documented.** Get started with [demo scripts][1] and [generated documentation][2].
- ✅ **Maintained.** Automated security updates. No threats from outdated dependencies.
- ✅ **Modern.** HTTP client with Promise API. Don't lose yourself in callback hell.
- ✅ **Reliable.** Follows [semantic versioning][3]. Get notified about breaking changes.
- ✅ **Robust.** Automatic requests retries are built-in. No problems if your Wi-Fi is gone.
- ✅ **Typed.** Source code is 100% TypeScript. No need to install external typings.

## Internals

This library utilizes [axios](https://github.com/axios/axios) for HTTP calls. You can configure the axios instance using [interceptors](https://axios-http.com/docs/interceptors) if needed. Retries are handled by [axios-retry](https://github.com/softonic/axios-retry), and payloads are validated with [Zod](https://github.com/colinhacks/zod).

## Resources

### Documentation

- [Trading212 API Docs](https://t212public-api-docs.redoc.ly/)
- [Reverse-Engineered Trading212’s Web APIs](https://haksoat.com/reverse-engineering-trading212/)
- [Forum: New Equity Trading API in Beta](https://community.trading212.com/t/61788)

### Tools

- [OpenAPI Generator: Global Properties](https://openapi-generator.tech/docs/globals/)
- [OpenAPI Generator: Config Options](https://openapi-generator.tech/docs/generators/typescript-fetch/#config-options)
- [JSON to Zod Schema](https://transform.tools/json-to-zod)

[1]: https://github.com/bennycode/trading212-api/tree/main/src/demo
[2]: https://github.com/bennycode/trading212-api/tree/main/docs
[3]: https://docs.npmjs.com/about-semantic-versioning
