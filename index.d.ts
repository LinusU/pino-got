import type { ExtendOptions } from 'got'

interface PinoGotOptions {
  /**
   * Desired logging level for HTTP events.
   * @default "info"
   */
  level?: string
  /**
   * Log request headers.
   * @default false
   */
  logRequestHeaders?: boolean
  /**
   * Log response headers.
   * @default false
   */
  logResponseHeaders?: boolean
  /**
   * Log request body. The body will be loggen when is defined with `json` or `form` options.
   * @default false
   */
  logRequestBody?: boolean
  /**
   * Log response body. The body will be loggen as is. It can be an object, a `Buffer`, or a string.
   * @default false
   */
  logResponseBody?: boolean
}

declare function pinoGotFactory (pino: any, options?: PinoGotOptions): ExtendOptions

export = pinoGotFactory
