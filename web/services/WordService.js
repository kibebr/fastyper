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

export const fetchWordNodes = () => new Promise((resolve, reject) => {
  const req = new XMLHttpRequest()
  req.open('GET', 'http://localhost:3002/wordlists')

  req.onload = () => {
    if (req.status >= 400 && req.status <= 500) {
      reject(Error(JSON.parse(req.responseText)))
    } else {
      resolve(JSON.parse(req.responseText))
    }
  }

  req.send()
})

export const fetchWordNode = id => 
  fetch(`http://localhost:3002/wordlists/${id}`)
    .then(res => res.json())
