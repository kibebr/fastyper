import { task, chain, map as tmap, Task } from 'fp-ts/Task'
import { fold } from 'fp-ts/Monoid'
import { getFirstMonoid, Option } from 'fp-ts/Option'
import { right, Either } from 'fp-ts/Either'
import { sequence } from 'fp-ts/Array'
import { UnparsedUser, UserDomainError, ParsedUser } from '../domain/User'
import { pipe, flow } from 'fp-ts/function'
import { queryByUsername, queryByEmail } from '../repositories/sql/UserRepository'

export const userExists = (user: UnparsedUser): Task<Option<ParsedUser>> => pipe(
  sequence(task)([queryByUsername(user.username), queryByEmail(user.email)]),
  tmap(fold(getFirstMonoid())
))

export const addUser = (user: UnparsedUser): Task<Either<any, string>> => flow(
  // TODO
)

// check if user already exists in the database
