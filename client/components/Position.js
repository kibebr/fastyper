export const addPositionComponent = ({ x, y } = {}) => entity => ({
  ...entity,
  components: {
    ...entity.components,
    position: {
      x: x || 0,
      y: y || 0
    }
  }
})
