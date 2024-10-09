# Pino: Got

A [Got](https://github.com/sindresorhus/got) handler that logs all requests to a [Pino](https://github.com/pinojs/pino) logger.

## Installation

```sh
npm install --save pino-got
```

## Compatibility

`pino-got` | `got`  | `pino`
---------- | ------ | ------
**`2.x`**  | `14.x`, `13.x`, `12.x` | `9.x`, `8.x`
**`1.x`**  | `11.x` | `6.x`

## Usage

```js
import got from 'got'
import pino from 'pino'
import pinoGot from 'pino-got'

const logger = pino({ level: 'debug' })
const gotLogger = pinoGot(logger)
const client = got.extend({ handlers: [gotLogger] })

client.get('https://example.com/')
```

Example output with [pino-pretty](https://github.com/pinojs/pino-pretty):

```text
[1603000000227] DEBUG (88800 on Linus-MacBook-Pro.local): Making GET request to https://example.com/
    method: "GET"
    headers: {
      "user-agent": "got (https://github.com/sindresorhus/got)"
    }

[1603000000694] DEBUG (88800 on Linus-MacBook-Pro.local): Got successful response in 467ms
    statusCode: 200
    headers: {
      "content-encoding": "gzip",
      "age": "451741",
      "cache-control": "max-age=604800",
      "content-type": "text/html; charset=UTF-8",
      "date": "Wed, 18 Oct 2020 05:46:40 GMT",
      "etag": "\"3147526947+gzip\"",
      "expires": "Wed, 25 Oct 2020 05:46:40 GMT",
      "last-modified": "Thu, 17 Oct 2019 07:18:26 GMT",
      "server": "ECS (nyb/1D1F)",
      "vary": "Accept-Encoding",
      "x-cache": "HIT",
      "content-length": "648",
      "connection": "close"
    }
    body: "<!doctype html>..."
    duration: "467ms"
```
