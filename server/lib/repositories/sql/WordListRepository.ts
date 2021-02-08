import { queryFirst } from './utils'
import { map as omap, Option } from 'fp-ts/Option'
import { map as tmap, Task } from 'fp-ts/Task'
import { Either } from 'fp-ts/Either'
import { pipe, flow } from 'fp-ts/function'
import { head } from 'fp-ts/Array'
import { parseWordList, WordList, WordListDomainError } from '../../domain/WordList'
import { ISelectWordListByIdCommandResult, ISelectWordListByIdCommandQuery } from './WordListRepository.types'
import { sql } from '@pgtyped/query'
import { db } from './main'

export const selectWordListByIdCommand = sql<ISelectWordListByIdCommandQuery>`SELECT * FROM word_lists WHERE id = $id`;
export const selectWordListById = (id: string): Task<ISelectWordListByIdCommandResult[]> => () => selectWordListByIdCommand.run({ id }, db)

export const queryById: (id: string) => Task<Option<Either<WordListDomainError, WordList>>> = flow(
  selectWordListById,
  tmap(flow(
    head,
    omap(parseWordList)
  )),
)
