import { monoidSum, fold } from 'fp-ts/Monoid'

export const average = (xs: number[]): number => fold(monoidSum)(xs) / xs.length
