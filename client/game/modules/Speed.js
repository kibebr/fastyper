const COMPONENT_NAME = 'speed'

let options = {
  baseSpeedMultiplier: 1
}

export const setBaseSpeed = newOne => {
  options.baseSpeedMultiplier = newOne
}

export const addSpeedComponent = speed => entity => {
  entity[COMPONENT_NAME] = { 
    getSpeed: () => speed * options.baseSpeedMultiplier 
  }
}
