export const addBoundaryCollisionComponent = entity => {
  entity['boundaryCollision'] = {}
}

export const createBoundaryCollisionSystem = ({ onCollision, limit }) => class BoundaryCollisionSystem {
  static run = entities => entities
    .filter(entity => 'boundaryCollision' in entity && 'position' in entity)
    .forEach(entity => {
      if (entity.position.x > limit) {
        onCollision(entity)
      }
    })
}

