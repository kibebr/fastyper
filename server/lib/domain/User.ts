import { Score } from './Score'
import { map, chain, right, fromPredicate, Applicative, Either } from 'fp-ts/lib/Either'
import { sequenceS } from 'fp-ts/lib/Apply'
import { average } from './Utils'
import { Eq } from 'fp-ts/Eq'
import { pipe, flow } from 'fp-ts/lib/function'
import { iso, Newtype } from 'newtype-ts'
import { isMinLength, isMaxLength, strHas, isAlphanumeric } from '../utils/String'
import { Modify } from '../utils/Types'

export interface Username extends Newtype<{ readonly Username: unique symbol }, string> {}
export interface Email extends Newtype<{ readonly Email: unique symbol }, string> {}
export interface ParsedPassword extends Newtype<{ readonly ParsedPassword: unique symbol }, string> {}

export enum UserDomainError {
  UsernameTooShort,
  UsernameTooLong,
  UsernameNotAlphanumeric,
  EmailTooShort,
  PasswordTooShort,
  EmailDoesntIncludeAt,
}

export type ParsedUser = {
  id: string
  username: Username
  email: Email,
  password: ParsedPassword,
  scores: Score[]
}

export type User = Modify<ParsedUser, {
  scores: string[]
}>

export type UnparsedUser = {
  id?: string,
  username: string,
  email: string,
  password: string
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

// TODO use traverse + lens
export const addScore = (score: Score) => (user: ParsedUser) => pipe(
  user.scores.concat(score),
  (x) => ({
    ...user,
    averageWpm: average(x.map(({ averageWpm }) => averageWpm)),
    scores: x
  })  
)

// TODO use spec
export const parseUser = (u: UnparsedUser): Either<UserDomainError, ParsedUser> => sequenceS(Applicative)({
  id: right(u.id || ''),
  username: parseUsername(u.username),
  email: parseEmail(u.email),
  password: parsePassword(u.password)
})

export const parseUserNoVal = (uP: any): ParsedUser => ({
  id: uP.id,
  username: iso<Username>().wrap(uP.username),
  email: iso<Email>().wrap(uP.email),
  password: iso<ParsedPassword>().wrap(uP.password)
})
