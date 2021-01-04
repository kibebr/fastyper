import { map, Either } from 'fp-ts/lib/Either'
import { flow } from 'fp-ts/lib/function'
import { createUser, User, UserDTO } from '../domain/User'

export const add: (user: UserDTO) => Either<string, User> = flow(
  createUser,
  map(saveUser)
)

export const findByUsername: (username: string) => Either<string, User> = flow(
  
)
