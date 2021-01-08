import { map as omap, Option }from 'fp-ts/lib/Option'
import { map as tmap, Task }from 'fp-ts/lib/Task'
import { head } from 'fp-ts/Array'
import { flow, pipe } from 'fp-ts/lib/function'
import { parseUser, User } from '../../domain/User'
import { QueryResult, QueryResultRow } from 'pg'
import { db } from './main'

const getRows = (result: QueryResult): QueryResultRow[] => result.rows
const query = (q: string): Task<QueryResult> => () => db.query(q)
const queryFirst: (q: string) => Task<Option<QueryResultRow>> = flow(
  query,
  tmap(flow(getRows, head))
)

type Usera = {
  id: number
}

const rowToUser = (r: QueryResultRow): Usera => ({ id: 10 })

export const findByUsername = (u: string): Task<Option<Usera>> => pipe(
  queryFirst('SELECT username bla bla'),
  tmap(omap(rowToUser))
)
