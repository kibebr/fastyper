import { map, chain, Either } from 'fp-ts/lib/Either'
import { flow } from 'fp-ts/lib/function'
import { iso, Newtype } from 'newtype-ts'
import { isMinLength, isMaxLength, strHas, isAlphanumeric } from '../utils/String'

interface Username extends Newtype<{ readonly Username: unique symbol }, string> {}
interface Email extends Newtype<{ readonly Email: unique symbol }, string> {}
interface Password extends Newtype<{ readonly Password: unique symbol }, string> {}

type User = {
  username: Username,
  email: Email,
  password: Password
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

const createPassword: (password: string) => Either<string, Password> = flow(
  isMinLength(6),
  map(iso<Password>().wrap)
)

