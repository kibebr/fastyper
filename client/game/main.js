import { ForwardSystem, addForwardComponent } from './modules/Forward.js'
import { addPositionComponent } from './modules/Position.js'
import { addSpeedComponent } from './modules/Speed.js'
import { getRandomNumFromRange } from './utils.js'

const systems = [ForwardSystem]

export const state = {
  entities: []
}

export const queryByWord = word => state.enties.find(entity => entity.word === word)

export const update = () => {
  systems.forEach(system => system.run(state.entities))
}

export const addWord = word => {
  const newEntity = { word }
  addSpeedComponent(3)(newEntity)
  addPositionComponent({
    x: 0,
    y: getRandomNumFromRange(0, 550)
  })(newEntity)
  addForwardComponent(newEntity)
  state.entities.push(newEntity)
}

export const getWords = () => state.entities
