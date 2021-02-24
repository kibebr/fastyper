import * as TE from 'fp-ts/TaskEither'
import * as A from 'fp-ts/Array'
import * as O from 'fp-ts/Option'
import * as M from 'fp-ts/Monoid'
import { right, chainFirstW, flatten, swap, fromOption, Either } from 'fp-ts/Either'
import { parseUser, UnparsedUser, UserDomainError, ParsedUser } from '../domain/User'
import { pipe, flow, constant } from 'fp-ts/function'
import { queryByUsername, queryByEmail } from '../repositories/sql/user/UserRepository'
import { generateId } from './Utils'

export type UserServiceErrors
  = 'UserExists'

export type UserServiceError
  = { tag: 'UserServiceError', reason: UserServiceErrors }

const createUserServiceError = (reason: UserServiceErrors): UserServiceError => ({
  tag: 'UserServiceError',
  reason
})

export const addId = (user: UnparsedUser): UnparsedUser => ({ ...user, id: generateId() })

// TE.sequenceArray
export const userExists = ({ username, email }: UnparsedUser): TE.TaskEither<Error, boolean> => pipe(
  A.sequence(TE.taskEither)([
    queryByUsername(username),
    queryByEmail(email)
  ]),
  TE.map(M.fold(O.getFirstMonoid())),
  TE.map(O.fold(
    constant(false),
    constant(true)
  ))
))

export const addUser = (user: UnparsedUser): TE.TaskEither<Error | UserDomainError, string> => pipe(
  userExists(user),

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
