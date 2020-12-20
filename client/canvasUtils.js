export const paintAll = color => canvas => {
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = color
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

export const clearCanvas = canvas => {
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

export const renderWord = word => canvas => {
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'white'
  ctx.font = '16px monospace'
  ctx.fillText(
    word.wordNode.word,
    word.position.x,
    word.position.y + 50
  )
}
