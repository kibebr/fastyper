import { map, chain, right, fromPredicate, Applicative, Either } from 'fp-ts/lib/Either'
import { sequenceS } from 'fp-ts/lib/Apply'
import { Eq } from 'fp-ts/Eq'
import { flow } from 'fp-ts/lib/function'
import { iso, Newtype } from 'newtype-ts'
import { isMinLength, isMaxLength, strHas, isAlphanumeric } from '../utils/String'
import { Modify } from '../utils/Types'

interface Username extends Newtype<{ readonly Username: unique symbol }, string> {}
interface Email extends Newtype<{ readonly Email: unique symbol }, string> {}
interface ParsedPassword extends Newtype<{ readonly ParsedPassword: unique symbol }, string> {}

enum UserDomainError {
  UsernameTooShort,
  UsernameTooLong,
  UsernameNotAlphanumeric,
  EmailTooShort,
  PasswordTooShort,
  EmailDoesntIncludeAt,
}

export type ParsedUser = {
  username: Username
  email: Email
}

export type User = Modify<ParsedUser, {
  id: string,
  password: string
}>

export type UnparsedUser = {
  username: string
  email: string
}

const eqUser: Eq<User> = {
  equals: (a, b) => a.id === b.id 
}

const parseUsername: (username: string) => Either<UserDomainError, Username> = flow(
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

const parseEmail: (email: string) => Either<UserDomainError, Email> = flow(
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

export const parsePassword: (password: string) => Either<UserDomainError, ParsedPassword> = flow(
  fromPredicate(
    isMinLength(6),
    () => UserDomainError.PasswordTooShort
  ),
  map(iso<ParsedPassword>().wrap)
)

// TODO use spec
export const parseUser = (uP: UnparsedUser): Either<UserDomainError, ParsedUser> => sequenceS(Applicative)({
  username: parseUsername(uP.username),
  email: parseEmail(uP.email)
})

export const parseUserNoVal = (uP: UnparsedUser): ParsedUser => ({
  username: iso<Username>().wrap(uP.username),
  email: iso<Email>().wrap(uP.email)
})

// TODO make validation easier
// List of [Error, Predicate]
// transform each into an Either
