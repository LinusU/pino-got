import type { HandlerFunction } from 'got'

declare interface PinoLike {
  debug: (obj: object, msg?: string) => void
  error: (obj: object, msg?: string) => void
}

declare function loggerFactory (pino: PinoLike): HandlerFunction

export = loggerFactory
