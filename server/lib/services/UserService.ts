import * as TE from 'fp-ts/TaskEither'
import * as A from 'fp-ts/Array'
import * as M from 'fp-ts/Monoid'
import * as O from 'fp-ts/Option'
import * as E from 'fp-ts/Either'
import { isoParsedPassword, parseUser, UnparsedUser, UserDomainError, ParsedUser } from '../domain/User'
import { pipe, flow, constant } from 'fp-ts/function'
import { queryInsertUser, queryByUsername, queryByEmail } from '../repositories/sql/user/UserRepository'
import { generateId, generatePasswordHash } from './Utils'

export type UserServiceErrors
  = 'UserExists'

export type UserServiceError
  = { tag: 'UserServiceError', reason: UserServiceErrors }

const createUserServiceError = (reason: UserServiceErrors): UserServiceError => ({
  tag: 'UserServiceError',
  reason
})

const hashPwdISO = isoParsedPassword.modify(generatePasswordHash)
// TE.sequenceArray
export const userExists = ({ username, email }: UnparsedUser): TE.TaskEither<Error, O.Option<ParsedUser>> => pipe(
  A.sequence(TE.taskEither)([
    queryByUsername(username),
    queryByEmail(email)
  ]),
  TE.map(M.fold(O.getFirstMonoid()))
))

export const addId = (user: UnparsedUser): UnparsedUser => ({ ...user, id: generateId() })
export const hashPwd = (user: ParsedUser): ParsedUser => ({ 
  ...user, 
  password: isoParsedPassword.wrap(await generatePasswordHash(isoParsedPassword.unwrap(user.password))()) 
})

export const addUser = (user: UnparsedUser): TE.TaskEither<Error | UserServiceError | UserDomainError, string> => pipe(
  userExists(user),
  TE.map(O.map(constant(createUserServiceError('UserExists')))),
  TE.chainW(flow(
    TE.fromOption(constant(addId(user))),
    TE.swap,
    TE.chainEitherKW(parseUser),
    TE.map(hashPwd),
    TE.chainW(queryInsertUser)
  ))
)

/* export const addUser = (user: UnparsedUser): Task<Either<ParsedUser | UserDomainError, ParsedUser>> => pipe( */
/*   userExists(user), */
/*   tmap(flow( */
/*     fromOption( */
/*       () => pipe( */
/*         addId(user), */
/*         (), */
/*       ) */
/*     ), */
/*     flatten, */
/*     swap, */
/*   )) */
/* ) */
// check if user already exists in the database

// username, email, password
// parse password and add id
// 
