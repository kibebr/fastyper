export const fetchWordsFrom = id => new Promise((resolve, reject) => {
  resolve([
    'many',
    'absolute',
    'driving',
    'test',
    'load',
    'cargo',
    'man',
    'woman',
    'shot',
    'bullet',
    'baleia',
    'windows',
    'linux'
  ])
})

export const fetchUserWithUsername = username => new Promise(resolve => resolve({
  username: 'kibe',
  level: 'Professional'
}))
