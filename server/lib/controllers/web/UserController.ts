import { map as emap, Either } from 'fp-ts/lib/Either'
import { map as tmap, Task } from 'fp-ts/lib/Task'
import { chain, fold, map as omap, fromNullable, Option } from 'fp-ts/lib/Option'
import { flow, pipe, Lazy } from 'fp-ts/lib/function'
import { parseUser, User, ParsedUser  } from '../../domain/User'
import { queryAll, queryByUsername } from '../../repositories/sql/UserRepository'
import { foldW } from '../../utils/Utils'
import { ok, HttpStatusCode, HttpResponse, HttpRequest } from './Controller'
import { type, string, Validation } from 'io-ts'

const getByUsernameV = type({
  params: type({
    username: string
  })
})

export const getAll: () => Task<HttpResponse<ParsedUser[]>> = flow(
  queryAll,
  tmap(ok)
)

export const getByUsername: (req: HttpRequest) => Validation<Task<HttpResponse<ParsedUser | string>>> = flow(
  getByUsernameV.decode,
  emap(x => queryByUsername('test')),
  emap(tmap(foldW(
    () => ({ code: 404, body: 'User not found.' }),
    ok
  ))
  )
)
