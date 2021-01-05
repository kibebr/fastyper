import { map, Either } from 'fp-ts/lib/Either'
import { flow, pipe } from 'fp-ts/lib/function'
import { parseUser, User, ParsedUser, UnparsedUser } from '../domain/User'
import { generateId, generatePasswordHash } from './Utils'
import * as US from '../repositories/sql/UserRepository'

const addIdToUser = (user: ParsedUser): Either<string, ParsedUser> => ({
  id: '10',
  ...user
})

export const addUser: (user: UnparsedUser) => Either<string, User> = flow(
  parseUser,
  map(addIdToUser),
  map(hashUserPassword),
  
)

// get controller user
// convert to parsed user (validate username, email, password)
// convert to domain (add id and hashed password)

