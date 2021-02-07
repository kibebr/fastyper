const wordNodes = [
  {
    id: '10',
    title: 'Gibberish',
    difficulty: 'easy',
    words: ['qqeqeok', 'akdkoaoka', 'adoadkoqkoew', 'adadzc', 'apqpeq', 'adoqedp', 'adaoqoek', 'adaodoqeoq', 'adosfooqo', 'akooako', 'aaodpaoc', 'zozkpaop', 'dfiojsodifgjp', 'asodksksf', 'odkppqld', 'dadoadop']
  },
  {
    id: '11',
    title: 'English',
    difficulty: 'easy',
    words: ['test', 'testing', 'chain', 'reaction', 'break', 'my', 'stride', 'wagon', 'wheel', 'superfluous', 'nevermind', 'oh', 'xenophobic', 'row', 'boat', 'columns', 'column', 'right', 'position', 'of', 'attention', 'by', 'the', 'left', 'flank']
  }
]
export const fetchWordNodes = (sort, filter) => Promise.resolve(wordNodes)

export const fetchWordNode = (id) => Promise.resolve(wordNodes.find(w => w.id === id))
