export const addForwardComponent = entity => ({
  ...entity,
  components: {
    ...entity.components,
    forward: {}
  }
})
