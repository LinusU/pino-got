export default function loggerFactory (pino) {
  return async function pinoGotLogger (options, next) {
    pino.debug({ method: options.method, headers: options.headers, body: options.json ?? options.form ?? undefined }, `Making ${options.method} request to ${options.url.href}`)

    try {
      const start = Date.now()
      const result = await next(options)

      try {
        const response = result
        const duration = `${Date.now() - start}ms`
        pino.debug({ statusCode: response.statusCode, headers: response.headers, body: response.body, duration }, `Got successful response in ${duration}`)
      } catch {}

      return result
    } catch (error) {
      const statusCode = error.response?.statusCode ?? undefined
      const headers = error.response?.headers ?? undefined
      const body = error.response?.body ?? undefined
      const stack = error.stack ?? String(error)

      pino.error({ statusCode, headers, body, stack }, `${options.method} request to ${options.url.href} failed`)

      throw error
    }
  }
}
