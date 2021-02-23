import * as TE from 'fp-ts/TaskEither'
import * as O from 'fp-ts/Option'
import * as A from 'fp-ts/Array'
import * as E from 'fp-ts/Either'
import * as t from 'io-ts'
import { flow } from 'fp-ts/function'
import { parseWordListNoVal, WordList } from '../../../domain/WordList'
import {
  selectWordListAll,
  selectWordListById
} from './WordListRepositoryCommands'

export const UnparsedWordListV = t.type({
  id: t.string,
  title: t.string,
  difficulty: t.string,
  words: t.array(t.string)
})

export const queryAll: () => TE.TaskEither<Error | t.Errors, WordList[]> = flow(
  selectWordListAll,
  TE.chainEitherKW(flow(
    A.map(flow(
      UnparsedWordListV.decode,
      E.map(parseWordListNoVal)
    )),
    A.sequence(E.Applicative)
  ))
)

export const queryById: (id: string) => TE.TaskEither<Error, O.Option<E.Either<t.Errors, WordList>>> = flow(
  selectWordListById,
  TE.map(flow(
    A.head,
    O.map(flow(
      UnparsedWordListV.decode,
      E.map(parseWordListNoVal)
    ))
  ))
)
