export const getRandomNumFromRange = (min, max) => (Math.random() * (max - min) + min) | 0

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
    renderWord: word => {
      ctx.fillStyle = 'white'
      ctx.font = '24px VT323'
      ctx.fillText(
        word.word,
        word.position.x,
        word.position.y + 100
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
