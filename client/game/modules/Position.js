const COMPONENT_NAME = 'position'

export const addPositionComponent = ({ x, y }) => entity => {
  entity[COMPONENT_NAME] = {
    x: x,
    y: y
  }
}
