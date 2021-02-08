import { QueryResult, QueryResultRow } from 'pg'
import { flow } from 'fp-ts/function'
import { map, Task } from 'fp-ts/Task'
import { Option } from 'fp-ts/Option'
import { head } from 'fp-ts/Array'
import { db } from './main'


export const getRows = (result: QueryResult): QueryResultRow[] => result.rows

export const query = (q: string): Task<QueryResult> => () => db.query(q)

export const queryFirst: (q: string) => Task<Option<QueryResultRow>> = flow(
  query,
  map(flow(
    getRows,
    head
  ))
)
