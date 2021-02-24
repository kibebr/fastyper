import { Score } from './Score'
import * as E from 'fp-ts/Either'
import * as AP from 'fp-ts/Apply'
import { average } from './Utils'
import { pipe, flow } from 'fp-ts/lib/function'
import { iso, Newtype } from 'newtype-ts'
import { isMinLength, isMaxLength, strHas, isAlphanumeric } from '../utils/String'

export interface Username extends Newtype<{ readonly Username: unique symbol }, string> {}
export interface Email extends Newtype<{ readonly Email: unique symbol }, string> {}
export interface ParsedPassword extends Newtype<{ readonly ParsedPassword: unique symbol }, string> {}

export type UserDomainErrors
  = 'UsernameTooShort'
  | 'UsernameTooLong'
  | 'UsernameNotAlphanumeric'
  | 'EmailTooShort'
  | 'PasswordTooShort'
  | 'EmailDoesntIncludeAt'

export type UserDomainError
  = { tag: 'UserDomainError', reason: UserDomainErrors }

const createUserDomainError = (reason: UserDomainErrors): UserDomainError => ({
  tag: 'UserDomainError',
  reason
})

export type ParsedUser = {
  id: string
  username: Username
  email: Email
  password: ParsedPassword
  scores: Score[]
}

export type UnparsedUser = {
  id: string
  username: string
  email: string
  password: string
  scores?: Score[]
}

const parseUsername: (username: string) => E.Either<UserDomainError, Username> = flow(
  E.fromPredicate(
    isMinLength(3),
    () => createUserDomainError('UsernameTooShort')
  ),
  E.chain(E.fromPredicate(
    isMaxLength(12),
    () => createUserDomainError('UsernameTooLong')
  )),
  E.chain(E.fromPredicate(
    isAlphanumeric,
    () => createUserDomainError('UsernameNotAlphanumeric')
  )),
  E.map(iso<Username>().wrap)
)

const parseEmail: (email: string) => E.Either<UserDomainError, Email> = flow(
  E.fromPredicate(
    isMinLength(1),
    () => createUserDomainError('EmailTooShort')
  ),
  E.chain(E.fromPredicate(
    strHas('@'),
    () => createUserDomainError('EmailDoesntIncludeAt')
  )),
  E.map(iso<Email>().wrap)
)

export const parsePassword: (password: string) => E.Either<UserDomainError, ParsedPassword> = flow(
  E.fromPredicate(
    isMinLength(6),
    () => createUserDomainError('PasswordTooShort')
  ),
  E.map(iso<ParsedPassword>().wrap)
)

// TODO use traverse + lens
export const addScore = (score: Score) => (user: ParsedUser): ParsedUser => pipe(
  user.scores.concat(score),
  (x) => ({
    ...user,
    averageWpm: average(x.map(({ averageWpm }) => averageWpm)),
    scores: x
  })
)

// TODO use spec
export const parseUser = (u: UnparsedUser): E.Either<UserDomainError, ParsedUser> => AP.sequenceS(E.Applicative)({
  id: E.right(u.id ?? ''),
  username: parseUsername(u.username),
  email: parseEmail(u.email),
  password: parsePassword(u.password),
  scores: E.right(u.scores ?? [] as Score[])
})

export const parseUserNoVal = (uP: any): ParsedUser => ({
  id: uP.id,
  username: iso<Username>().wrap(uP.username),
  email: iso<Email>().wrap(uP.email),
  password: iso<ParsedPassword>().wrap(uP.password),
  scores: uP.scores
})
