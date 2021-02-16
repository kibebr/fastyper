import { map as tmap, Task } from 'fp-ts/Task'
import { foldW } from 'fp-ts/Option'
import { ParsedUser } from '../../domain/User'
import { queryAll, queryByUsername } from '../../repositories/sql/UserRepository'
import { notFound, ok, HttpResponse } from './Controller'
import { Errors, type, string, Validation } from 'io-ts'
import { flow } from 'fp-ts/function'
import { prop } from 'fp-ts-ramda'

const getByUsernameV = type({
  params: type({
    username: string
  })
})

export const getAll: () => Task<HttpResponse<ParsedUser[]>> = flow(queryAll, tmap(ok))

export const getByUsername: (u: string) => Task<HttpResponse<string> | HttpResponse<ParsedUser>> = flow(
  queryByUsername,
  tmap(foldW(
    () => notFound('User not found.'),
    ok
  ))
)
