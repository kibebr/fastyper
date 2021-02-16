import { map as emap, Either } from 'fp-ts/lib/Either'
import { map as tmap, Task } from 'fp-ts/lib/Task'
import { chain as techain, flatten, fromEither, fromTask, map as temap, of, TaskEither } from 'fp-ts/TaskEither'
import { chain, fold, map as omap, fromNullable, Option } from 'fp-ts/lib/Option'
import { flow, pipe, Lazy } from 'fp-ts/lib/function'
import { parseUser, User, ParsedUser  } from '../../domain/User'
import { queryAll, queryByUsername } from '../../repositories/sql/UserRepository'
import { foldW } from '../../utils/Utils'
import { ok, notFound, HttpStatusCode, HttpResponse, HttpRequest } from './Controller'
import { Errors, type, string, Validation } from 'io-ts'
import { prop } from 'fp-ts-ramda'

const getByUsernameV = type({
  params: type({
    username: string
  })
})

const getUsernameFromParam = flow(prop('params'), prop('username'))

export const getAll: () => Task<HttpResponse<ParsedUser[]>> = flow(
  queryAll,
  tmap(ok)
)
