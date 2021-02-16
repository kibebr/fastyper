import { queryAll, queryById } from '../../repositories/sql/WordListRepository'
import { ok, HttpRequest, HttpResponse } from './Controller'
import { WordList } from '../../domain/WordList'
import { foldW as efoldW, Either } from 'fp-ts/Either'
import { foldW as ofoldW } from 'fp-ts/Option'
import { flow } from 'fp-ts/function'
import { map as tmap, Task } from 'fp-ts/Task'

export const getAll: () => Task<HttpResponse<string> | HttpResponse<WordList[]>> = flow(
  queryAll,
  tmap(efoldW(
    () => ({ code: 500, body: 'Oops, there were some issues when trying to fetch the words!' }),
    ok
  ))
)

export const getById: (id: string) => Task<HttpResponse<string> | HttpResponse<WordList>> = flow(
  queryById,
  tmap(ofoldW(
    () => ({ code: 404, body: 'WordList not found!' }),
    efoldW(
      () => ({ code: 500, body: 'There was an issue while parsing the WordList.' }),
      ok
    )
  ))
)
