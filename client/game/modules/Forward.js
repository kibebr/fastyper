export class ForwardSystem {
  static run = entities => {
    entities
      .filter(entity => 'forward' in entity && 'position' in entity && 'speed' in entity)
      .forEach(entity => {
        entity.position.x += entity.speed.getSpeed()
      })
  }
}

export const addForwardComponent = entity => {
  entity['forward'] = {}
}
