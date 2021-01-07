import * as O from 'fp-ts/lib/Option'
import * as T from 'fp-ts/lib/Task'
import { head } from 'fp-ts/Array'
import { flow, pipe } from 'fp-ts/lib/function'
import { parseUser, User } from '../../domain/User'
import { QueryResult, QueryResultRow } from 'pg'
import { db } from './main'

const getRows = (result: QueryResult): QueryResultRow[] => result.rows

const query = (q: string): T.Task<QueryResult> => async () => await db.query(q)
const queryFirst: (q: string) => T.Task<O.Option<QueryResultRow>> = flow(
  query,
  T.map(flow(
    getRows, 
    head
  )),
)

type Usera = {
  id: number
}

const rowToUser = (r: QueryResultRow): Usera => ({ id: 10 })

export const findByUsername = (u: string): T.Task<O.Option<Usera>> => pipe(
  queryFirst('SELECT username bla bla'),
  T.map(O.map(rowToUser))
)
