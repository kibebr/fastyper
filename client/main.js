import { addWordNodeComponent } from './components/WordNode.js'
import { addForwardComponent } from './components/Forward.js'
import { addPositionComponent } from './components/Position.js'
import util from 'util'
import { pipeArr, spec, map, prop } from './utils.js'

class MoveForwardSystem {
  static run = entity => ({
    ...entity,
    components: {
      ...entity.components,
      position: {
        ...entity.components.position,
        x: entity.components.position.x + 1
      }
    }
  })
}

console.log(prop('run')(MoveForwardSystem))
const systems = [MoveForwardSystem]
const getRuns = map(prop('run'))

const firstWord = {}
  |> addWordNodeComponent('myword')
  |> addPositionComponent
  |> addForwardComponent

let state = {
  wordNodes: [firstWord]
}

const nextState = spec({
  wordNodes: map(pipeArr(getRuns(systems)))
})

console.log(util.inspect(nextState(state), false, null, true))
