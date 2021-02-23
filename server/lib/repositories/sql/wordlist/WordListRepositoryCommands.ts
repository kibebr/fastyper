import { tryCatch, TaskEither } from 'fp-ts/TaskEither'
import { toError } from 'fp-ts/Either'
import { 
  ISelectWordListByIdCommandResult, 
  ISelectWordListByIdCommandQuery,
  ISelectWordListAllCommandQuery,
  ISelectWordListAllCommandResult,
} from './WordListRepository.types'
import { sql } from '@pgtyped/query'
import { db } from '../main'

export const selectWordListByIdCommand = sql<ISelectWordListByIdCommandQuery>`SELECT * FROM word_lists WHERE id = $id`;
export const selectWordListById = (id: string): TaskEither<Error, ISelectWordListByIdCommandResult[]> => tryCatch(
  async () => await selectWordListByIdCommand.run({ id }, db),
  toError
)

export const selectWordListAllCommand = sql<ISelectWordListAllCommandQuery>`SELECT * FROM word_lists`;
export const selectWordListAll = (): TaskEither<Error, ISelectWordListAllCommandResult[]> => tryCatch(
  async () => await selectWordListAllCommand.run(undefined, db),
  toError
)
