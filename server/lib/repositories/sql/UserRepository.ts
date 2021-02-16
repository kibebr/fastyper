import { map as omap, Option } from 'fp-ts/lib/Option'
import { map as tmap, Task } from 'fp-ts/lib/Task'
import { head, map as amap } from 'fp-ts/Array'
import { flow } from 'fp-ts/lib/function'
import { parseUserNoVal, ParsedUser } from '../../domain/User'
import { sql } from '@pgtyped/query'
import { 
  ISelectUserByUsernameCommandQuery, 
  ISelectUserByUsernameCommandResult,
  ISelectUserByEmailCommandQuery, 
  ISelectUserByEmailCommandResult,
  ISelectAllUsersCommandQuery,
  ISelectAllUsersCommandResult
} from './UserRepository.types'
import { db } from './main'

const selectUserByUsernameCommand = 
  sql<ISelectUserByUsernameCommandQuery>`SELECT * FROM users WHERE username = $u LIMIT 1`
const selectUserByUsername = (u: string): Task<ISelectUserByUsernameCommandResult[]> => () =>
  selectUserByUsernameCommand.run({ u }, db)

const selectUserByEmailCommand = 
  sql<ISelectUserByEmailCommandQuery>`SELECT * FROM users WHERE email = $e LIMIT 1`
const selectUserByEmail = (e: string): Task<ISelectUserByEmailCommandResult[]> => () =>
  selectUserByEmailCommand.run({ e }, db)

const selectAllUsersCommand = 
  sql<ISelectAllUsersCommandQuery>`SELECT * FROM users`
const selectAllUsers = (): Task<ISelectAllUsersCommandResult[]> => () => selectAllUsersCommand.run(void 0, db)

export const queryAll: () => Task<ParsedUser[]> = flow(
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

export const queryByEmail: (e: string) => Task<Option<ParsedUser>> = flow(
  selectUserByEmail,
  tmap(flow(
    head,
    omap(parseUserNoVal)
  ))
)
