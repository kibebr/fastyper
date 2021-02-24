import * as T from 'fp-ts/Task'
import * as O from 'fp-ts/Option'
import * as TE from 'fp-ts/TaskEither'
import * as t from 'io-ts'
import * as TP from 'ts-pattern'
import * as C from './Controller'
import { UserDomainError, UserDomainErrors, UnparsedUser, ParsedUser } from '../../domain/User'
import { queryAll, queryByUsername } from '../../repositories/sql/user/UserRepository'
import { constant, pipe, flow } from 'fp-ts/function'
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

export const getAll: () => T.Task<C.HttpResponse<string> | C.HttpResponse<ParsedUser[]>> = flow(
  queryAll,
  TE.foldW(
    constant(T.of(C.internalError())),
    (user) => T.of(C.ok(user))
  )
)

export const getByUsername: (req: C.HttpRequest) => T.Task<C.HttpResponse<ParsedUser> | C.HttpResponse<string>> = flow(
  getByUsernameV.decode,
  TE.fromEither,
  TE.chainW(flow(
    prop('params'),
    prop('username'),
    queryByUsername
  )),
  TE.foldW(
    constant(T.of(C.internalError())),
    (o) => T.of(O.foldW(
      constant(C.notFound('User')),
      (user): C.HttpResponse<ParsedUser> => C.ok(user as ParsedUser)
    )(o))
  )
)

declare function addUser (u: UnparsedUser): TE.TaskEither<Error | ParsedUser | UserDomainError, unknown>

const handleError = (err: Error | ParsedUser | UserDomainError): string => {
  if (err instanceof Error) {
    return 'Internal error!'
  } else if(typeof err === ParsedUser) {

  }
}

const userDomainErrorMsg = (err: UserDomainErrors): string =>
  TP.match(err)
    .exhaustive()
    .with('UsernameNotAlphanumeric', constant('Username must be alphanumeric.'))
    .with('UsernameTooLong', constant('Username is too long!'))
    .with('UsernameTooShort', constant('Username is too short!'))
    .with('EmailTooShort', constant('Email is too short!'))
    .with('EmailDoesntIncludeAt', constant('Email does not include "@".'))
    .with('PasswordTooShort', constant('Password needs to have at least 3 characters.'))
    .run()

export const postUser: (req: C.HttpRequest) => T.Task<C.HttpResponse<string>> = flow(
  postUserV.decode,
  TE.fromEither,
  TE.chainW(flow(
    prop('body'),
    addUser
  )),
  TE.fold(
    (err) => T.of(
      TP.match(err)
        .with({ tag: 'UserDomainError' }, flow(userDomainErrorMsg, C.forbidden))
        .otherwise(C.internalError)
    ),
    constant(T.of(C.ok('User created!'))
    )
  )
)
