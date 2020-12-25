import { ForwardSystem, addForwardComponent } from './modules/Forward.js'
import { addPositionComponent } from './modules/Position.js'
import { addSpeedComponent } from './modules/Speed.js'
import { getRandomNumFromRange } from './utils.js'

const systems = [ForwardSystem]

const state = {
  entities: [],
  seconds: 0,
  wpm: 0
}

export const queryByWord = word => state.entities.find(entity => entity.word === word)

export const update = () => {
  systems.forEach(system => system.run(state.entities))
}

export const addWord = word => {
  const newEntity = { word }
  addSpeedComponent(3)(newEntity)
  addPositionComponent({
    x: getRandomNumFromRange(-100, 100),
    y: getRandomNumFromRange(0, 550)
  })(newEntity)
  addForwardComponent(newEntity)
  state.entities = state.entities.concat(newEntity)
}

export const getWords = () => state.entities.filter(entity => 'word' in entity)

export const findAndDeleteWord = word => {
  const entity = state.entities.find(entity => entity.word === word)

  if (entity) {
    state.entities = state.entities.filter(_entity => _entity !== entity)
    return entity
  } else {
    return null
  }
}

export const startTimer = () => setInterval(() => {
  state.seconds += 1
}, 1000)

