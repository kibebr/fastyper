import { map as omap, Option } from 'fp-ts/Option'
import { map as tmap, Task } from 'fp-ts/Task'
import { map as amap, head, sequence } from 'fp-ts/Array'
import { map as emap, chain, either, Either } from 'fp-ts/Either'
import { pipe, flow } from 'fp-ts/function'
import { parseWordListNoVal, WordList, WordListDomainError } from '../../domain/WordList'
import { 
  ISelectWordListByIdCommandResult, 
  ISelectWordListByIdCommandQuery,
  ISelectWordListAllCommandQuery,
  ISelectWordListAllCommandResult,
} from './WordListRepository.types'
import { sql } from '@pgtyped/query'
import { db } from './main'
import { type, Errors, string, array } from 'io-ts'

export const selectWordListByIdCommand = sql<ISelectWordListByIdCommandQuery>`SELECT * FROM word_lists WHERE id = $id`;
export const selectWordListById = (id: string): Task<ISelectWordListByIdCommandResult[]> => () => selectWordListByIdCommand.run({ id }, db)

export const selectWordListAllCommand = sql<ISelectWordListAllCommandQuery>`SELECT * FROM word_lists`;
export const selectWordListAll = (): Task<ISelectWordListAllCommandResult[]> => () => selectWordListAllCommand.run(void 0, db)

export const UnparsedWordListV = type({
  id: string,
  title: string,
  difficulty: string,
  words: array(string)
})

export const queryAll: () => Task<Either<Errors, WordList[]>> = flow(
  selectWordListAll,
  tmap(amap(UnparsedWordListV.decode)),
  tmap(sequence(either)),
  tmap(emap(amap(parseWordListNoVal)))
)

export const queryById: (id: string) => Task<Option<Either<Errors, WordList>>> = flow(
  selectWordListById,
  tmap(flow(
    head,
    omap(flow(
      UnparsedWordListV.decode,
      emap(parseWordListNoVal)
    ))
  ))
)

