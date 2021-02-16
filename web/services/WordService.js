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

export const fetchHomepageWordList = () => new Promise((resolve, reject) => {
  const request = new XMLHttpRequest()
  request.open('GET', 'https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-no-swears.txt')

  request.onload = () => {
    resolve(request.responseText)
  }

  request.onerror = () => reject(Error('not good'))

  request.send()
})
