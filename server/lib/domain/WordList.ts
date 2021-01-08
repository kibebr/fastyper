import { map, chain, fromPredicate, Either } from 'fp-ts/Either'
import { flow } from 'fp-ts/function'
import { Newtype, iso } from 'newtype-ts'
import { isMaxLength, isMinLength } from '../utils/String'

interface Title extends Newtype<{ readonly Title: unique symbol }, string> {}

enum WordListDomainError {
  TitleTooShort,
  TitleTooLong
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

type WordList = {
  title: Title,
  difficulty: Difficulty
}

// function semigroup steps:
// isLengthOkay = semigroupPredicate.concat(isMinLength(3), isMinLength(10))
// isLengthOkay is now (a), that (a) => S.concat(f(a), g(a)) where f = isMinLength(3) and g = isMinLength(10)
