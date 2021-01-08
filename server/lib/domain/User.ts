import { map, chain, right, fromPredicate, Either } from 'fp-ts/lib/Either'
import { flow } from 'fp-ts/lib/function'
import { iso, Newtype } from 'newtype-ts'
import { isMinLength, isMaxLength, strHas, isAlphanumeric } from '../utils/String'

type Modify<T, R> = Omit<T, keyof R> & R;

interface Username extends Newtype<{ readonly Username: unique symbol }, string> {}
interface Email extends Newtype<{ readonly Email: unique symbol }, string> {}
interface ParsedPassword extends Newtype<{ readonly ParsedPassword: unique symbol }, string> {}
interface HashedPassword extends Newtype<{ readonly HashedPassword: unique symbol }, string> {}

enum UserDomainError {
  UsernameTooShort,
  UsernameTooLong,
  UsernameNotAlphanumeric,
  EmailTooShort,
  PasswordTooShort,
  EmailDoesntIncludeAt,
}

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

const createUsername: (username: string) => Either<UserDomainError, Username> = flow(
  fromPredicate(
    isMinLength(3),
    () => UserDomainError.UsernameTooShort
  ),
  chain(fromPredicate(
    isMaxLength(12),
    () => UserDomainError.UsernameTooLong
  )),
  chain(fromPredicate(
    isAlphanumeric,
    () => UserDomainError.UsernameNotAlphanumeric
  )),
  map(iso<Username>().wrap)
)

const createEmail: (email: string) => Either<UserDomainError, Email> = flow(
  fromPredicate(
    isMinLength(1),
    () => UserDomainError.EmailTooShort
  ),
  chain(fromPredicate(
    strHas('@'),
    () => UserDomainError.EmailDoesntIncludeAt
  )),
  map(iso<Email>().wrap)
)

const createParsedPassword: (password: string) => Either<UserDomainError, ParsedPassword> = flow(
  fromPredicate(
    isMinLength(6),
    () => UserDomainError.PasswordTooShort
  ),
  map(iso<ParsedPassword>().wrap)
)

export const parseUser = (uP: UnparsedUser): Either<UserDomainError, ParsedUser> => {
  const user: ParsedUser = {
    username: iso<Username>().wrap('username'),
    email: iso<Email>().wrap('mail@mail.com'),
    password: iso<ParsedPassword>().wrap('pwd')
  }
  
  return right(user)
}

// TODO make validation easier
// List of [Error, Predicate]
// transform each into an Either
