import * as O from 'fp-ts/lib/Option'
import * as TE from 'fp-ts/TaskEither'
import * as A from 'fp-ts/Array'
import { flow } from 'fp-ts/lib/function'
import { parseUserNoVal, ParsedUser } from '../../../domain/User'
import {
  selectAllUsers,
  selectUserByUsername,
  selectUserByEmail
} from './UserRepositoryCommands'

export const queryAll: () => TE.TaskEither<Error, ParsedUser[]> = flow(
  selectAllUsers,
  TE.map(A.map(parseUserNoVal))
)

export const queryByUsername: (u: string) => TE.TaskEither<Error, O.Option<ParsedUser>> = flow(
  selectUserByUsername,
  TE.map(flow(
    A.head,
    O.map(parseUserNoVal)
  ))
)

export const queryByEmail: (e: string) => TE.TaskEither<Error, O.Option<ParsedUser>> = flow(
  selectUserByEmail,
  TE.map(flow(
    A.head,
    O.map(parseUserNoVal)
  ))
)

export const insertUser: (u: ParsedUser) => TE.TaskEither<Error, string> = flow(
  insertUser,
)
