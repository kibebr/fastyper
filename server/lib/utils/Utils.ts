import { Lazy } from 'fp-ts/function'
import { isNone, Option } from 'fp-ts/Option'

// foldW, will be released in FP-TS 2.10, 'til then use this one (for Option)
export function foldW<B, A, C>(onNone: Lazy<B>, onSome: (a: A) => C): (ma: Option<A>) => B | C {
  return (ma) => (isNone(ma) ? onNone() : onSome(ma.value))
}

