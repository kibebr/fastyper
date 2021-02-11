import { map, chain, left, right, fromPredicate, Either, Applicative } from 'fp-ts/Either'
import { flow, pipe } from 'fp-ts/function'
import { Newtype, iso } from 'newtype-ts'
import { isMaxLength, isMinLength } from '../utils/String'
import { sequenceS } from 'fp-ts/lib/Apply'
import { sequence } from 'fp-ts/Array'

interface Title extends Newtype<{ readonly Title: unique symbol }, string> {}
interface Word extends Newtype<{ readonly Word: unique symbol }, string> {}

export enum WordListDomainError {
  TitleTooShort,
  TitleTooLong,
  WordTooShort,
  WordTooLong
}

type Difficulty = 
  | 'Easy' 
  | 'Medium'
  | 'Hard'

const parseTitle: (t: string) => Either<WordListDomainError, Title> = flow(
  fromPredicate(
    isMinLength(3),
    () => WordListDomainError.TitleTooShort
  ),
  chain(fromPredicate(
    isMaxLength(10),
    () => WordListDomainError.TitleTooLong
  )),
  map(iso<Title>().wrap)
)

const parseWord: (w: string) => Either<WordListDomainError, Word> = flow(
  fromPredicate(
    isMinLength(1),
    () => WordListDomainError.WordTooShort
  ),
  chain(fromPredicate(
    isMaxLength(15),
    () => WordListDomainError.WordTooLong
  )),
  map(iso<Word>().wrap)
)

export type WordList = {
  id: string,
  title: Title,
  difficulty: Difficulty,
  words: Word[]
}

export type UnparsedWordList = {
  id: string,
  title: string,
  difficulty: string,
  words: string[]
}

export const parseWordList = (uW: UnparsedWordList): Either<WordListDomainError, WordList> => sequenceS(Applicative)({
  id: right(uW.id),
  title: parseTitle(uW.title),
  difficulty: right(<Difficulty>'Hard'),
  words: pipe(uW.words.map(parseWord), sequence(Applicative))
})

// function semigroup steps:
// isLengthOkay = semigroupPredicate.concat(isMinLength(3), isMinLength(10))
// isLengthOkay is now (a), that (a) => S.concat(f(a), g(a)) where f = isMinLength(3) and g = isMinLength(10)
