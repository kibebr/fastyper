import { getRandomNumFromRange } from './getRandomNumFromRange.js'

export const createWordObj = boundaries => probFn => name => ({
  name,
  pos: [
    getRandomNumFromRange(-200, 0),
    getRandomNumFromRange(10, boundaries[1])
  ],
  tag: probFn() <= 0.1 ? 'BOMB' : 'NORMAL'
})
