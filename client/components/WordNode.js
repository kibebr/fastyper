export const addWordNodeComponent = word => entity => ({
  ...entity,
  components: {
    ...entity.components,
    wordNode: { word }
  }
})
