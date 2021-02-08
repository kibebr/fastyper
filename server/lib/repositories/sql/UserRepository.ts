import { map as omap, Option } from 'fp-ts/lib/Option'
import { map as tmap, Task } from 'fp-ts/lib/Task'
import { head } from 'fp-ts/Array'
import { flow, pipe } from 'fp-ts/lib/function'
import { parseUserNoVal, User, UnparsedUser, ParsedUser } from '../../domain/User'
import { QueryResult, QueryResultRow } from 'pg'
import { getRows, query, queryFirst } from './utils'
import { db } from './main'

const rowToUnparsedUser = (row: QueryResultRow) => <UnparsedUser>row

export const findByUsername = (u: string): Task<Option<ParsedUser>> => pipe(
  queryFirst('SELECT username bla bla'),
  tmap(omap(flow(
    rowToUnparsedUser, 
    parseUserNoVal
  )))
)
