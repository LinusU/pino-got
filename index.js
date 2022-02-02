// Fired request index (used to generate the request identifier).
let index = 0

// Symbol used to save a unique identifier inside request's context.
const symId = Symbol.for('pino-got')

function pinoGotFactory (pino, factoryOptions = {}) {
  const level = factoryOptions.level || 'info'
  if (!Object.keys(pino.levels.values).includes(level)) {
    throw new Error(`Log level "${level}" is not available`)
  }

  const log = pino[level].bind(pino)

  return {
    hooks: {
      init: [
        options => {
          options.context = {
            ...options.context,
            [symId]: `got-${(++index).toString(36)}`
          }
        }
      ],
      beforeRequest: [
        options => {
          log(
            {
              reqId: options.context[symId],
              method: options.method,
              url: options.url.href,
              headers: factoryOptions.logRequestHeaders
                ? options.headers
                : undefined,
              body: factoryOptions.logRequestBody
                ? options.json || options.form
                : undefined
            },
            'outcoming request'
          )
        }
      ],
      afterResponse: [
        response => {
          log(
            {
              reqId: response.request.options.context[symId],
              statusCode: response.statusCode,
              responseTime: Date.now() - response.timings.start,
              headers: factoryOptions.logResponseHeaders
                ? response.headers
                : undefined,
              body: factoryOptions.logResponseBody
                ? response.body
                : undefined
            },
            'request completed'
          )
          return response
        }
      ]
    }
  }
}

module.exports = pinoGotFactory
