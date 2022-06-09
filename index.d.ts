import type { HandlerFunction } from 'got'

declare interface PinoLike {
  debug: (obj: object, msg?: string) => void
  error: (obj: object, msg?: string) => void
}

export default function loggerFactory (pino: PinoLike): HandlerFunction
