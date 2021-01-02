import { map, chain, left, right, Either } from 'fp-ts/lib/Either'
import { flow } from 'fp-ts/lib/function'
import { iso, Newtype } from 'newtype-ts'

interface Username extends Newtype<{ readonly Username: unique symbol }, string> {}
interface Email extends Newtype<{ readonly Email: unique symbol }, string> {}
interface Password extends Newtype<{ readonly Password: unique symbol }, string> {}

type User = {
  username: Username,
  email: Email,
  password: Password
}

const appendToStartStr = (str1: string) => (str2: string): string => str1 + str2

const isMinLength = (len: number) => (str: string): Either<string, string> => 
  str.length >= len 
    ? right(str) 
    : left(' must be larger.') 

const isMaxLength = (len: number) => (str: string): Either<string, string> =>
  str.length <= len
    ? right(str)
    : left(' has to be shorter.')

const strHas = (str: string) => (str2: string): Either<string, string> => 
  str.includes(str2)
   ? right(str)
   : left(`${str} does not contain ${str2}.`)

const isAlphanumeric = (str: string): Either<string, string> => 
  /^[a-z0-9]+$/i.test(str)
    ? right(str)
    : left(` is not alphanumeric.`)

export const createUsername: (username: string) => Either<string, Username> = flow(
  isMinLength(3),
  chain(isMaxLength(10)),
  chain(isAlphanumeric),
  map(iso<Username>().wrap)
)

export const createEmail: (email: string) => Either<string, Email> = flow(
  isMinLength(1),
  chain(strHas('@')),
  map(iso<Email>().wrap)
)

export const createPassword: (password: string) => Either<string, Password> = flow(
  isMinLength(6),
  map(iso<Password>().wrap)
)
