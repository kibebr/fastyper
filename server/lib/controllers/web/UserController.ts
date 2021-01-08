import { Either } from 'fp-ts/lib/Either'
import { chain, map, fromNullable, Option } from 'fp-ts/lib/Option'
import { flow, pipe } from 'fp-ts/lib/function'
import { parseUser, User, UserDTO } from '../../domain/User'
import { findByUsername } from '../../repositories/sql/UserRepository'
import { HttpRequest } from './Types'

type UserRegisterBody = {
  username: string,
  email: string,
  password: string
}

type HttpResponse = {
  code: number
  body: string | object
}

const prop = <O extends HttpRequest, P extends keyof O>(path: P) => (obj: O): O[P] => obj[path]

export const getUser: (req: HttpRequest) => HttpResponse = pipe(
  prop('params'),
  findByUsername,
)

export const getUser: (req: HttpRequest) => HttpResponse = flow(

)
