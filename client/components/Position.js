export const addPositionComponent = entity => ({
  ...entity,
  components: {
    ...entity.components,
    position: {
      x: 0,
      y: 0
    }
  }
})
