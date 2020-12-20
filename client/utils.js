export const pipeArr = fns => t => fns.reduce((f, b) => b(f), t)
export const spec = novo => old => Object.keys(old)
  .reduce((result, key) => {
    result[key] = novo[key](old[key])
    return result
  }, {})
export const objOf = k => v => ({ [k]: v })
export const map = fn => t => t.map(fn)
export const prop = name => t => t[name]
