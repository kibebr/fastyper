import { IO } from 'fp-ts/lib/IO'
import { Task } from 'fp-ts/lib/Task'
import { hash } from 'bcrypt'
import { v4 as uuid } from 'uuid'

const makeError = (err: unknown): Error => new Error(`${err}`)

const createGeneratePasswordHash = (saltRounds: number) => (pwd: string): Task<string> => () => hash(pwd, saltRounds)

export const generatePasswordHash = createGeneratePasswordHash(10)
export const generateId: IO<string> = () => uuid()
