import * as O from 'fp-ts/Option'
import * as TE from 'fp-ts/TaskEither'
import * as T from 'fp-ts/Task'
import * as C from './Controller'
import { queryAll, queryById } from '../../repositories/sql/wordlist/WordListRepository'
import { WordList } from '../../domain/WordList'
import { pipe, flow, constant } from 'fp-ts/function'

export const getAll: () => T.Task<C.HttpResponse<string> | C.HttpResponse<WordList[]>> = flow(
  queryAll,
  TE.foldW(
    pipe(C.internalError(), T.of, constant),
    flow(C.ok, T.of)
  )
)

export const getById: (id: string) => T.Task<C.HttpResponse<string> | C.HttpResponse<WordList>> = flow(
  queryById,
  TE.foldW(
    pipe(C.internalError(), T.of, constant),
    (o) => T.of(O.foldW(
      pipe(C.notFound('WordList not found.'), constant),
      (wl) => C.ok(wl as WordList)
    )(o))
  )
)
