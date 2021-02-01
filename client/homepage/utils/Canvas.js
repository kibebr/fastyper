export const getRandomNumFromRange = (min, max) => (Math.random() * (max - min) + min) | 0

export const createCanvas = ({ width, height }) => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  canvas.style.width = width
  canvas.style.height = height
  return canvas
}

export const paintAll = color => canvas => {
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = color
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

export const renderWord = word => canvas => {
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'white'
  ctx.font = 'normal 16px VT323'
  ctx.fillText(
    word.word,
    word.pos[0],
    word.pos[1]
  )  
}

export const createCanvasRenderer = canvas => {
  const ctx = canvas.getContext('2d')
  const stars = new Array(500)
  for (let i = 0; i < 500; ++i) {
    stars[i] = { 
      x: getRandomNumFromRange(0, canvas.width),
      y: getRandomNumFromRange(0, canvas.height)
    }
  }

  return {
    paintAll: color => {
      ctx.fillStyle = color
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    },
    clearCanvas: () =>  {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    },
    renderWordObj: wordObj => {
      ctx.fillStyle = 'white'
      ctx.font = '20px VT323'
      ctx.fillText(
        wordObj.name,
        wordObj.pos[0],
        wordObj.pos[1]
      )  
    },
    renderStars: () => {
      ctx.fillStyle = 'white'
      for (let i = 0; i < 500; ++i) {
        stars[i].x += 1

        if (stars[i].x > canvas.width) {
          stars[i].x = 0
        }

        ctx.fillRect(stars[i].x, stars[i].y, 1, 1)
      }
    }
  }
}
