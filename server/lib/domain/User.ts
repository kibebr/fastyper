import { map, chain, right, Either } from 'fp-ts/lib/Either'
import { flow } from 'fp-ts/lib/function'
import { iso, Newtype } from 'newtype-ts'
import { isMinLength, isMaxLength, strHas, isAlphanumeric } from '../utils/String'

type Modify<T, R> = Omit<T, keyof R> & R;

interface Username extends Newtype<{ readonly Username: unique symbol }, string> {}
interface Email extends Newtype<{ readonly Email: unique symbol }, string> {}
interface ParsedPassword extends Newtype<{ readonly ParsedPassword: unique symbol }, string> {}
interface HashedPassword extends Newtype<{ readonly HashedPassword: unique symbol }, string> {}

export type ParsedUser = {
  id?: string
  username: Username
  email: Email
  password: ParsedPassword
}

export type User = Modify<ParsedUser, {
  id: string
  password: HashedPassword
}>

export type UnparsedUser = {
  id?: string
  username: string
  email: string
  password: string
}

const createUsername: (username: string) => Either<string, Username> = flow(
  isMinLength(3),
  chain(isMaxLength(10)),
  chain(isAlphanumeric),
  map(iso<Username>().wrap)
)

const createEmail: (email: string) => Either<string, Email> = flow(
  isMinLength(1),
  chain(strHas('@')),
  map(iso<Email>().wrap)
)

const createParsedPassword: (password: string) => Either<string, ParsedPassword> = flow(
  isMinLength(6),
  map(iso<ParsedPassword>().wrap)
)

export const parseUser = (uP: UnparsedUser): Either<string, ParsedUser> => {
  const user: ParsedUser = {
    username: iso<Username>().wrap('username'),
    email: iso<Email>().wrap('mail@mail.com'),
    password: iso<ParsedPassword>().wrap('pwd')
  }
  
  return right(user)
}

export const justParse = (uP: UnparsedUser): User => ({
  id: <string>uP.id,
  username: iso<Username>().wrap(uP.username),
  email: iso<Email>().wrap(uP.email),
  password: iso<HashedPassword>().wrap(uP.password)
})
