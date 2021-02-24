import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import * as TE from 'fp-ts/TaskEither'
import * as T from 'fp-ts/Task'
import { queryAll, queryById } from '../../repositories/sql/wordlist/WordListRepository'
import { ok, HttpRequest, internalError, notFound, HttpResponse } from './Controller'
import { WordList } from '../../domain/WordList'
import { flow } from 'fp-ts/function'
import { map as tmap, Task } from 'fp-ts/Task'

export const getAll: () => T.Task<HttpResponse<string> | HttpResponse<WordList[]>> = flow(
  queryAll,
  TE.foldW(
    () => T.of({ code: 500, body: 'Internal error.' }),
    (wordList) => T.of(ok(wordList))
  )
)

export const getById: (id: string) => T.Task<HttpResponse<string> | HttpResponse<WordList>> = flow(
  queryById,
  TE.foldW(
    () => T.of(internalError()),
    (o) => T.of(O.foldW(
      () => notFound('WordList not found.'),
      (wl) => ok(wl as WordList)
    )(o))
  )
)
