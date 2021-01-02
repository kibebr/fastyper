import { left, right, Either } from 'fp-ts/lib/Either'

export const isMinLength = (len: number) => (str: string): Either<string, string> => 
  str.length >= len 
    ? right(str) 
    : left(' must be larger.') 

export const isMaxLength = (len: number) => (str: string): Either<string, string> =>
  str.length <= len
    ? right(str)
    : left(' has to be shorter.')

export const strHas = (str: string) => (str2: string): Either<string, string> => 
  str.includes(str2)
   ? right(str)
   : left(`${str} does not contain ${str2}.`)

export const isAlphanumeric = (str: string): Either<string, string> => 
  /^[a-z0-9]+$/i.test(str)
    ? right(str)
    : left(` is not alphanumeric.`)
