const wordNodes = [
  {
    id: '10',
    title: 'Gibberish',
    difficulty: 'easy',
    words: ['qqeqeok', 'akdkoaoka', 'adoadkoqkoew', 'adadzc', 'apqpeq', 'adoqedp', 'adaoqoek', 'adaodoqeoq', 'adosfooqo', 'akooako', 'aaodpaoc', 'zozkpaop', 'dfiojsodifgjp', 'asodksksf', 'odkppqld', 'dadoadop']
  }
]
export const fetchWordNodes = (sort, filter) => Promise.resolve(wordNodes)

export const fetchWordNode = (id) => Promise.resolve(wordNodes.find(w => w.id === id))
