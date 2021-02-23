export enum HttpStatusCode {
  OK = 200,
  NOT_FOUND = 404
}

export type HttpResponse<T> = {
  code: HttpStatusCode,
  body: T
}

export type HttpRequest = {
  body?: unknown,
  query?: unknown,
  params?: unknown
}

export const internalError = (): HttpResponse<string> => ({ code: 500, body: 'Internal error.' })
export const badRequest = (): HttpResponse<string> => ({ code: 400, body: 'Bad Request. Missing or invalid parameters were used.' })
export const notFound = (msg: string): HttpResponse<string> => ({ code: 404, body: msg })
export const ok = <A>(body: A): HttpResponse<A> => ({ code: 200, body })
