import { Either } from 'fp-ts/lib/Either'
import { map as tmap, Task } from 'fp-ts/lib/Task'
import { chain, fold, map as omap, fromNullable, Option } from 'fp-ts/lib/Option'
import { flow, pipe, Lazy } from 'fp-ts/lib/function'
import { parseUser, User, ParsedUser  } from '../../domain/User'
import { queryByUsername } from '../../repositories/sql/UserRepository'
import { HttpRequest } from './Types'
import { Modify } from '../../utils/Types'
import { foldW } from '../../utils/Utils'

enum HttpStatusCode {
  OK = 200,
  NOT_FOUND = 404
}

type GetByUsernameReq = {
  query: {
    username: string
  }
}

type HttpResponse<T> = {
  code: HttpStatusCode,
  body: T
}

export const getByUsername = (req: GetByUsernameReq): Task<HttpResponse<ParsedUser | string>> => pipe(
  queryByUsername(req.query.username),
  tmap(foldW(
    () => ({ code: 404, body: 'User not found.' }),
    (user) => ({ code: 200, body: user })
  ))
)
