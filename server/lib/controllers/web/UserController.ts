import { Either } from 'fp-ts/lib/Either'
import { chain, map, fromNullable, Option } from 'fp-ts/lib/Option'
import { flow, pipe } from 'fp-ts/lib/function'
import { createUser, User, UserDTO } from '../../domain/User'
import { findByUsername } from '../../repositories/sql/UserRepository'
import { HttpRequest } from './Types'

type HttpResponse = {
  code: number
  body: string
}

const prop = <O extends HttpRequest, P extends keyof O>(
  path: P
) => (obj: O): O[P] => obj[path]

export const getUser: (req: HttpRequest) => HttpResponse = pipe(
  prop('params'),
  findByUsername,
)
