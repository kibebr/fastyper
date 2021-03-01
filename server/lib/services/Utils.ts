import * as TE from 'fp-ts/TaskEither'
import * as IO from 'fp-ts/IO'
import * as E from 'fp-ts/Either'
import { constant } from 'fp-ts/function'
import { hash, compare } from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { sign, verify } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const createGeneratePasswordHash = (saltRounds: number) => (pwd: string): TE.TaskEither<Error, string> => TE.tryCatch(
  constant(hash(pwd, saltRounds)),
  E.toError
)

export const generateId: IO.IO<string> = () => uuid()

export const encrypt = (data: string): IO.IO<string> => (): string => sign(data, process.env.SECRET as string)
export const decrypt = (data: string): IO.IO<string | object> => (): string | object => verify(data, process.env.SECRET as string)

export const generatePasswordHash = createGeneratePasswordHash(10)
export const comparePasswordHash = ([pwd, hashed]: [string, string]): TE.TaskEither<Error, boolean> => TE.tryCatch(
  constant(compare(pwd, hashed)),
  E.toError
)
