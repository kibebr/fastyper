import { map as omap, Option } from 'fp-ts/lib/Option'
import { map as tmap, Task } from 'fp-ts/lib/Task'
import { head } from 'fp-ts/Array'
import { flow, pipe } from 'fp-ts/lib/function'
import { parseUserNoVal, User, UnparsedUser, ParsedUser } from '../../domain/User'
import { QueryResult, QueryResultRow } from 'pg'
import { getRows, query, queryFirst } from './utils'
import { sql } from '@pgtyped/query'
import { ISelectUserByUsernameCommandQuery, ISelectUserByUsernameCommandResult } from './UserRepository.types'
import { db } from './main'

const selectUserByUsernameCommand = 
  sql<ISelectUserByUsernameCommandQuery>`SELECT * FROM users WHERE username = $u LIMIT 1`
const selectUserByUsername = (u: string): Task<ISelectUserByUsernameCommandResult[]> => () =>
  selectUserByUsernameCommand.run({ u }, db)

export const queryByUsername: (u: string) => Task<Option<ParsedUser>> = flow(
  selectUserByUsername,
  tmap(flow(
    head,
    omap(parseUserNoVal)
  ))
)
