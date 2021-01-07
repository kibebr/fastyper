import * as E from 'fp-ts/lib/Either'
import * as IO from 'fp-ts/lib/IO'
import { flow, pipe } from 'fp-ts/lib/function'
import { parseUser, User, ParsedUser, UnparsedUser } from '../domain/User'
import { generateId, generatePasswordHash } from './Utils'
import { sequenceS } from 'fp-ts/lib/Apply'
import * as US from '../repositories/sql/UserRepository'

const merge = <A>(x: A) => (y: object): A => ({ ...x, ...y })

const addIdToUser: (user: ParsedUser) => IO.IO<ParsedUser> = flow(
  merge,
  IO.of,
  IO.ap(sequenceS(IO.io)({ id: generateId() }))
)
// get controller user
// convert to parsed user (validate username, email, password)
// convert to domain (add id and hashed password)

// merge (user) (Either<string, { id: }>)
// lift them all
// merge (Right<User>).apply(sequence)
