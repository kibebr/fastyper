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

export const ok = <A>(body: A): HttpResponse<A> => ({ code: 200, body })
