import { Either } from 'fp-ts/lib/Either'
import { chain, map, fromNullable, Option } from 'fp-ts/lib/Option'
import { flow, pipe } from 'fp-ts/lib/function'
import { createUser, User, UserDTO } from '../../domain/User'
import { HttpRequest } from './Types'

const prop = <O extends Record<string, unknown>, P extends keyof O>(
  path: P
) => (obj: O): O[P] => obj[path]

export const getUser: (req: HttpRequest) => Either<string, User> = flow(
  prop('params'),
)
