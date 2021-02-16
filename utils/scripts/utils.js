import { nanoid } from 'nanoid'

export const createSample = words => ({
  id: nanoid(),
  title: 'WordListTitle',
  difficulty: 'Hard',
  words
})
