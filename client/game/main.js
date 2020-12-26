import { ForwardSystem, addForwardComponent } from './modules/Forward.js'
import { addPositionComponent } from './modules/Position.js'
import { addSpeedComponent } from './modules/Speed.js'
import { getRandomNumFromRange } from './utils.js'
import { addBoundaryCollisionComponent, createBoundaryCollisionSystem } from './modules/BoundaryCollision.js'

export const createState = ({ width, height, callbacks }) => {
  const state = {
    prompt: '',
    seconds: 0,
    wpm: 0,
    entities: []
  }

  const handleWordBoundaryCollision = entity => {
    if (!'bomb' in entity) {
      callbacks.onOver()
    }
  }

  const systems = [
    ForwardSystem,
    createBoundaryCollisionSystem({
      limit: width,
      onCollision: handleWordBoundaryCollision
    })
  ]

  return {
    update: () => {
      systems.forEach(system => system.run(state.entities))

      state.entities
        .filter(entity => 'word' in entity)
        .forEach(wordEntity => {
          if (wordEntity.word === state.prompt) {
            state.entities = state.entities.filter(ent => ent !== wordEntity)
            callbacks.onDestroy(wordEntity)
          } 
        })
    },

    addWord: word => {
      const newEntity = { word }

      addSpeedComponent(3)(newEntity)
      addPositionComponent({
        x: getRandomNumFromRange(-100, 100),
        y: getRandomNumFromRange(0, height + 1)
      })(newEntity)
      addForwardComponent(newEntity)
      addBoundaryCollisionComponent(newEntity)

      state.entities = state.entities.concat(newEntity)
    },

    setPrompt: newPrompt => {
      state.prompt = newPrompt
    },

    getWords: () => state.entities.filter(entity => 'word' in entity),

    startTimer: () => setInterval(() => {
      state.seconds += 1
    }, 1000)
  }
}
