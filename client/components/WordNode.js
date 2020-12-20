export const addWordNodeComponent = word => entity => ({
  ...entity,
  wordNode: { word }
})
