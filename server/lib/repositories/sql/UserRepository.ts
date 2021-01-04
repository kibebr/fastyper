import * as O from 'fp-ts/lib/Option'
import * as TE from 'fp-ts/lib/TaskEither'
import { head } from 'fp-ts/Array'
import { flow, pipe } from 'fp-ts/lib/function'
import { createUser, User, UserDTO } from '../../domain/User'
import { QueryResult } from 'pg'
import { db } from './main'

const getRows = (result: QueryResult): any[] => result.rows

export const findByUsername = (username: string): TE.TaskEither<Error, O.Option<User>> => pipe(
  TE.tryCatch(
    () => db.query('// query'),
    (err) => new Error(`${err}`)
  ),
  TE.map(flow(
    getRows, 
    head,
    O.map(createUser)
  )),
)


