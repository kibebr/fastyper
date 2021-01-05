import * as TE from 'fp-ts/lib/TaskEither'
import * as IOE from 'fp-ts/lib/IOEither'
import { hash } from 'bcrypt'
import { v4 as uuid } from 'uuid'

const makeError = (err: unknown): Error => new Error(`${err}`)

const createGeneratePasswordHash = (saltRounds: number) => (pwd: string): TE.TaskEither<Error, string> => TE.tryCatch(
  () => hash(saltRounds, pwd),
  makeError
)

export const generatePasswordHash = createGeneratePasswordHash(10)

export const generateId = (): IOE.IOEither<Error, string> => IOE.tryCatch(uuid, makeError)
