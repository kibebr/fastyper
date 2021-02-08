import { map as omap, Option } from 'fp-ts/lib/Option'
import { map as tmap, Task } from 'fp-ts/lib/Task'
import { head, map as amap } from 'fp-ts/Array'
import { flow, pipe } from 'fp-ts/lib/function'
import { parseUserNoVal, User, UnparsedUser, ParsedUser } from '../../domain/User'
import { getRows, query, queryFirst } from './utils'
import { sql } from '@pgtyped/query'
import { 
  ISelectUserByUsernameCommandQuery, 
  ISelectUserByUsernameCommandResult,
  ISelectAllUsersCommandQuery,
  ISelectAllUsersCommandResult
} from './UserRepository.types'
import { db } from './main'

const selectUserByUsernameCommand = 
  sql<ISelectUserByUsernameCommandQuery>`SELECT * FROM users WHERE username = $u LIMIT 1`
const selectUserByUsername = (u: string): Task<ISelectUserByUsernameCommandResult[]> => () =>
  selectUserByUsernameCommand.run({ u }, db)

const selectAllUsersCommand = 
  sql<ISelectAllUsersCommandQuery>`SELECT * FROM users`
const selectAllUsers = (): Task<ISelectAllUsersCommandResult[]> => () => selectAllUsersCommand.run(void 0, db)

export const queryAll: () => Task<Array<ParsedUser>> = flow(
  selectAllUsers,
  tmap(amap(parseUserNoVal))
)

export const queryByUsername: (u: string) => Task<Option<ParsedUser>> = flow(
  selectUserByUsername,
  tmap(flow(
    head,
    omap(parseUserNoVal)
  ))
)
