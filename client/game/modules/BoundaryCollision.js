const COMPONENT_NAME = 'boundaryCollision'

export const addBoundaryCollisionComponent = entity => {
  entity[COMPONENT_NAME] = {}
}

export const createBoundaryCollisionSystem = ({ onCollision, limit }) => class BoundaryCollisionSystem {
  static run = entities => entities
    .filter(entity => COMPONENT_NAME in entity)
    .forEach(entity => {
      if (entity.position.x > limit) {
        onCollision(entity)
      }
    })
}

