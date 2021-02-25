import * as TE from 'fp-ts/TaskEither'
import * as IO from 'fp-ts/IO'
import * as E from 'fp-ts/Either'
import { constant } from 'fp-ts/function'
import { hash } from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { decode, verify } from 'jsonwebtoken'

const createGeneratePasswordHash = (saltRounds: number) => (pwd: string): TE.TaskEither<Error, string> => TE.tryCatch(
  constant(hash(pwd, saltRounds)),
  E.toError
)

export const generatePasswordHash = createGeneratePasswordHash(10)
export const generateId: IO.IO<string> = () => uuid()
