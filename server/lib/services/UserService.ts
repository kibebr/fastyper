import * as TE from 'fp-ts/TaskEither'
import * as A from 'fp-ts/Array'
import * as M from 'fp-ts/Monoid'
import * as O from 'fp-ts/Option'
import * as B from 'fp-ts/boolean'
import {
  isoUsername,
  isoEmail,
  isoParsedPassword,
  parseUser,
  UnparsedUser,
  UserDomainError,
  ParsedUser
} from '../domain/User'
import { pipe, flow, constant, flip } from 'fp-ts/function'
import { queryInsertUser, queryByUsername, queryByEmail } from '../repositories/sql/user/UserRepository'
import {
  generateId,
  generatePasswordHash,
  comparePasswordHash,
  encrypt
} from './Utils'

export type UserServiceErrors
  = 'UserExists'
  | 'IncorrectCredentials'

export interface UserServiceError {
  tag: 'UserServiceError'
  reason: UserServiceErrors
}

export interface TokenizedUser {
  token: string
  username: string
}

export interface AuthUser {
  username: string
  password: string
}

const createUserServiceError = (reason: UserServiceErrors): UserServiceError => ({
  tag: 'UserServiceError',
  reason
})

const userExistsError: UserServiceError = createUserServiceError('UserExists')
const incorrectCredentialsError: UserServiceError = createUserServiceError('IncorrectCredentials')

export const unwrap = (user: ParsedUser): UnparsedUser => ({
  ...user,
  username: isoUsername.unwrap(user.username),
  email: isoEmail.unwrap(user.email),
  password: isoParsedPassword.unwrap(user.password)
})

export const tokenizeUser: (user: ParsedUser) => TokenizedUser = flow(
  unwrap,
  ({ username }) => ({ token: encrypt(username)(), username })
)

// TODO: TE.sequenceArray
export const userExists = ({ username, email }: UnparsedUser): TE.TaskEither<Error, O.Option<ParsedUser>> => pipe(
  A.sequence(TE.taskEither)([
    queryByUsername(username),
    queryByEmail(email)
  ]),
  TE.map(M.fold(O.getFirstMonoid()))
)

export const addId = (user: UnparsedUser): UnparsedUser => ({ ...user, id: generateId() })
export const hashPwd = (user: ParsedUser): TE.TaskEither<Error, ParsedUser> => pipe(
  generatePasswordHash(isoParsedPassword.unwrap(user.password)),
  TE.map((hashed) => ({
    ...user,
    password: isoParsedPassword.wrap(hashed)
  }))
)

export const addUser = (user: UnparsedUser): TE.TaskEither<Error | UserServiceError | UserDomainError, string> => pipe(
  userExists(user),
  TE.map(O.map(pipe(userExistsError, constant))),
  TE.chainW(flow(
    TE.fromOption(pipe(user, addId, constant)),
    TE.swap,
    TE.chainEitherKW(parseUser),
    TE.chainW(hashPwd),
    TE.chainW(queryInsertUser)
  ))
)

export const authUser = ({ username, password }: AuthUser): TE.TaskEither<Error | UserServiceError, TokenizedUser> => pipe(
  queryByUsername(username),
  TE.chainW(TE.fromOption(pipe(incorrectCredentialsError, constant))),
  TE.chainW((storedUser) => pipe(
    comparePasswordHash([password, pipe(storedUser.password, isoParsedPassword.unwrap)]),
    TE.chainW(B.foldW(
      pipe(incorrectCredentialsError, TE.left, constant),
      pipe(storedUser, tokenizeUser, TE.right, constant)
    ))
  ))
)
