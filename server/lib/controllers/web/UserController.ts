import * as T from 'fp-ts/Task'
import * as O from 'fp-ts/Option'
import * as E from 'fp-ts/Either'
import * as TE from 'fp-ts/TaskEither'
import { UnparsedUser, ParsedUser } from '../../domain/User'
import { queryAll, queryByUsername } from '../../repositories/sql/UserRepository'
import { badRequest, internalError, notFound, ok, HttpResponse } from './Controller'
import { Errors, type, string, Validation, TypeOf } from 'io-ts'
import { pipe, flow } from 'fp-ts/function'
import { prop } from 'fp-ts-ramda'

const postUserV = type({
  body: type({
    username: string,
    email: string,
    password: string
  })
})

const getByUsernameV = type({
  params: type({
    username: string
  })
})

type GetByUsernameRequest = TypeOf<typeof getByUsernameV>

export const getAll: () => T.Task<HttpResponse<ParsedUser[]>> = flow(queryAll, T.map(ok))

type NotFound = {
  code: number
  body: string
}

type Ok<A> = {
  code: number
  body: A
}

type BadRequest = {
  code: number
  body: string
}

type InternalError = {
  code: number,
  body: string
}

type _HttpResponse<A>
  = Ok<A>
  | NotFound
  | BadRequest

const _badRequest = (): BadRequest => ({ code: 400, body: 'Bad request.' })
const _ok = <A>(a: A): Ok<A> => ({ code: 200, body: a })
const _notFound = (): NotFound => ({ code: 404, body: 'Not found.' })
const _internalError = (): InternalError => ({ code: 500, body: 'Internal error.' })

export const getByUsername: (req: GetByUsernameRequest) => T.Task<_HttpResponse<ParsedUser>> = flow(
  getByUsernameV.decode,
  E.foldW(
    () => T.of(_badRequest()),
    flow(
      prop('params'),
      prop('username'),
      queryByUsername,
      TE.fold(
        () => T.of(_internalError()),
        O.fold(
          () => T.of(_notFound()),
          (user) => T.of(_ok(user))
        )
      )
    )
  )
)

declare const addUser: (user: UnparsedUser) => TaskEither<any, ParsedUser>

