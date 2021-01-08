import * as E from 'fp-ts/lib/Either'
import * as IO from 'fp-ts/lib/IO'
import { flow, pipe } from 'fp-ts/lib/function'
import { parseUser, User, ParsedUser, UnparsedUser } from '../domain/User'
import { generateId, generatePasswordHash } from './Utils'
import { sequenceS } from 'fp-ts/lib/Apply'
import * as US from '../repositories/sql/UserRepository'

const addIdToUser = (u: ParsedUser): ParsedUser => ({ id: generateId(), ...u })

export const addUser: (uP: UnparsedUser) => E.Either<string, User> = flow(
  parseUser,
  E.map(addIdToUser),

)
