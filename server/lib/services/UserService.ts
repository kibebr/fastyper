import { task, chain as tchain, map as tmap, Task } from 'fp-ts/Task'
import { fold } from 'fp-ts/Monoid'
import { getFirstMonoid, Option } from 'fp-ts/Option'
import { right, chainFirstW, flatten, swap, fromOption, Either } from 'fp-ts/Either'
import { sequence } from 'fp-ts/Array'
import { parseUser, UnparsedUser, UserDomainError, ParsedUser } from '../domain/User'
import { pipe, flow, identity } from 'fp-ts/function'
import { queryByUsername, queryByEmail } from '../repositories/sql/UserRepository'
import { generateId } from './Utils'

export const addId = (user: UnparsedUser): UnparsedUser => ({ ...user, id: generateId() })

export const userExists = ({ username, email }: UnparsedUser): Task<Option<ParsedUser>> => pipe(
  sequence(task)([
    queryByUsername(username), 
    queryByEmail(email)
  ]),
  tmap(fold(getFirstMonoid())
))

export const addUser = (user: UnparsedUser): Task<Either<ParsedUser | UserDomainError, ParsedUser>> => pipe(
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
