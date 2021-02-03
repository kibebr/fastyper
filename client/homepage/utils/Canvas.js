export const getRandomNumFromRange = (min, max) => (Math.random() * (max - min) + min) | 0

export const createCanvas = ({ width, height }) => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  canvas.style.width = width
  canvas.style.height = height
  return canvas
}

export const createCanvasRenderer = canvas => {
  const ctx = canvas.getContext('2d')
  const stars = [...new Array(500)].map(_ => ({ 
    x: getRandomNumFromRange(0, canvas.width),
    y: getRandomNumFromRange(0, canvas.height)
  }))
  const destroyedScores = []

  return {
    paintAll: color => {
      ctx.fillStyle = color
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    },
    clearCanvas: () =>  {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    },
    renderWordObj: wordObj => {
      if (wordObj.tag === 'BOMB') {
        ctx.fillStyle = 'red'
      } else {
        const x = (wordObj.pos[0] / canvas.width) * 256
        ctx.fillStyle = `rgb(256, ${280 - x}, ${300 - (x * 1.5)})`
      }
      ctx.font = '22px VT323'
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
    },
    renderWPM: wpm => {
      ctx.fillStyle = 'white'
      ctx.font = '32px VT323'
      ctx.fillText(`WPM: ${wpm}`, canvas.width - 100, 50)
    },
    renderScore: score => {
      ctx.fillStyle = '#00ff80'
      ctx.fillText(`SCORE: ${score}`, canvas.width - 100, 100)
    },
    renderDestroyedScores: () => {
      ctx.fillStyle = '#00ff80'
      ctx.font = '22px VT323'

      destroyedScores.forEach(ds => {
        ctx.fillText(`+${ds[1]}`, ds[0].pos[0], ds[0].pos[1])
      })
    },
    addDestroyedScore: (word, score) => {
      setTimeout
      destroyedScores.push([word, score])
    }
  }
}
