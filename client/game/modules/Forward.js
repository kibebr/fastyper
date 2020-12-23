const COMPONENT_NAME = 'forward'

export class ForwardSystem {
  static run = entities => {
    entities
      .filter(entity => COMPONENT_NAME in entity)
      .forEach(entity => {
        entity.position.x += entity.speed.getSpeed()
      })
  }
}

export const addForwardComponent = entity => {
  entity[COMPONENT_NAME] = {}
}
