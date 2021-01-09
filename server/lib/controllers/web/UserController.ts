import { Either } from 'fp-ts/lib/Either'
import { map as tmap, Task } from 'fp-ts/lib/Task'
import { chain, fold, map as omap, fromNullable, Option } from 'fp-ts/lib/Option'
import { flow, pipe } from 'fp-ts/lib/function'
import { parseUser, User, ParsedUser  } from '../../domain/User'
import { findByUsername } from '../../repositories/sql/UserRepository'
import { HttpRequest } from './Types'
import { Modify } from '../../utils/Types'

type UserRegisterBody = {
  username: string,
  email: string,
  password: string
}

type UserGetBody = {
  username: string
}

type HttpResponse = {
  code: number,
  body: object | string
}

type HttpRequestGetUser = Modify<HttpRequest, {
  params: { username: string }
}>

const prop = <O extends Record<string, unknown>, P extends keyof O>(
  path: P
) => (obj: O): O[P] => obj[path]

const getUsername = (req: HttpRequestGetUser): string => req.params.username

export const getUser: (req: HttpRequestGetUser) => Task<HttpResponse> = flow(
  getUsername,
  findByUsername,
  tmap(fold(
    () => ({ code: 404, body: 'a' }),
    (user) => ({ code: 200, body: 'a' })
  ))
)
