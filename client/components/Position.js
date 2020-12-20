export const addPositionComponent = ({ x, y } = {}) => entity => ({
  ...entity,
  position: {
    x: x || 0,
    y: y || 0
  }
})
