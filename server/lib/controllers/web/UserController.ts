import * as T from 'fp-ts/Task'
import * as O from 'fp-ts/Option'
import * as TE from 'fp-ts/TaskEither'
import * as t from 'io-ts'
import * as TP from 'ts-pattern'
import * as C from './Controller'
import { UserDomainError, UserDomainErrors, ParsedUser } from '../../domain/User'
import { addUser, authUser, TokenizedUser, UserServiceError, UserServiceErrors } from '../../services/UserService'
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

const authUserV = t.type({
  body: t.type({
    username: t.string,
    password: t.string
  })
})

const getByUsernameV = t.type({
  params: t.type({
    username: t.string
  })
})

const userDomainErrorMsg = (err: UserDomainErrors): string =>
  TP.match(err)
    .exhaustive()
    .with('UsernameNotAlphanumeric', constant('Username must be alphanumeric.'))
    .with('UsernameTooLong', constant('Username is too long!'))
    .with('UsernameTooShort', constant('Username is too short!'))
    .with('EmailTooShort', constant('Email is too short!'))
    .with('EmailDoesntInclude@', constant('Email does not include "@".'))
    .with('PasswordTooShort', constant('Password needs to have at least 6 characters.'))
    .run()

const userServiceErrorMsg = (err: UserServiceErrors): string =>
  TP.match(err)
    .exhaustive()
    .with('UserExists', constant('User with same username or email already exists.'))
    .with('IncorrectCredentials', constant('Incorrect username or password.'))
    .run()

export const getAll: () => T.Task<C.HttpResponse<string> | C.HttpResponse<ParsedUser[]>> = flow(
  queryAll,
  TE.foldW(
    pipe(C.internalError(), T.of, constant),
    flow(C.ok, T.of)
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
    pipe(C.internalError(), T.of, constant),
    (o) => T.of(O.foldW(
      pipe('User not found!', C.notFound, constant),
      (user): C.HttpResponse<ParsedUser> => C.ok(user as ParsedUser)
    )(o))
  )
)

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
        .with({ tag: 'UserDomainError' }, flow(prop('reason'), userDomainErrorMsg, C.forbidden))
        .with({ tag: 'UserServiceError' }, flow(prop('reason'), userServiceErrorMsg, C.forbidden))
        .otherwise(C.internalError)
    ),
    pipe('User created!', C.ok, T.of, constant)
  )
)

export const postAuth: (req: C.HttpRequest) => T.Task<C.HttpResponse<string> | C.HttpResponse<TokenizedUser>> = flow(
  authUserV.decode,
  TE.fromEither,
  TE.chainW(flow(
    prop('body'),
    authUser
  )),
  TE.foldW(
    (error) => T.of(
      TP.match(error)
        .with({ tag: 'UserServiceError' }, flow(prop('reason'), userServiceErrorMsg, C.forbidden))
        .otherwise(constant(C.internalError()))
    ),
    flow(C.ok, T.of)
  )
)
