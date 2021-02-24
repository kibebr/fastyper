import * as T from 'fp-ts/Task'
import * as O from 'fp-ts/Option'
import * as TE from 'fp-ts/TaskEither'
import * as t from 'io-ts'
import { UnparsedUser, ParsedUser } from '../../domain/User'
import { queryAll, queryByUsername } from '../../repositories/sql/user/UserRepository'
import { badRequest, internalError, notFound, ok, HttpResponse, HttpRequest } from './Controller'
import { pipe, flow } from 'fp-ts/function'
import { prop } from 'fp-ts-ramda'

const postUserV = t.type({
  body: t.type({
    username: t.string,
    email: t.string,
    password: t.string
  })
})

const getByUsernameV = t.type({
  params: t.type({
    username: t.string
  })
})

export const getAll: () => T.Task<HttpResponse<string> | HttpResponse<ParsedUser[]>> = flow(
  queryAll,
  TE.foldW(
    () => T.of(internalError()),
    (user) => T.of(ok(user))
  )
)

export const getByUsername: (req: HttpRequest) => T.Task<HttpResponse<ParsedUser> | HttpResponse<string>> = flow(
  getByUsernameV.decode,
  TE.fromEither,
  TE.chainW(flow(
    prop('params'),
    prop('username'),
    queryByUsername
  )),
  TE.foldW(
    () => T.of(internalError()),
    (o) => T.of(O.foldW(
      () => notFound('User'),
      (user): HttpResponse<ParsedUser> => ok(user as ParsedUser)
    )(o))
  )
)

declare function addUser (u: UnparsedUser): TE.TaskEither<Error, unknown>

export const postUser: (req: HttpRequest) => T.Task<HttpResponse<string>> = flow(
  postUserV.decode,
  TE.fromEither,
  TE.chainW(flow(
    prop('body'),
    addUser
  )),
  TE.fold(
    () => T.of(internalError()),
    () => T.of(ok('User created!')
    )
  )
)
