import { getRandomNumFromRange } from '../../common/getRandomNumFromRange.js'

export const createCanvas = ({ width, height }) => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  canvas.style.width = width
  canvas.style.height = height
  return canvas
}

export const renderStars = stars => canvas => {
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'white'
  for (let i = 0, len = stars.length; i < len; ++i) {
    ctx.fillRect(stars[i][0], stars[i][1], 2, 2)
  }
}

export const renderWord = wordObj => canvas => {
  const ctx = canvas.getContext('2d')
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
}

export const paintAll = color => canvas => {
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = color
  ctx.fillRect(0, 0, canvas.width, canvas.height)
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
      ctx.font = '22px VT323'
      ctx.fillText(`wpm: ${wpm}`, canvas.width - 200, 50)
    },
    renderScore: score => {
      ctx.fillStyle = '#00ff80'
      ctx.fillText(`score: ${score}`, canvas.width - 200, 100)
    },
    renderSeconds: seconds => {
      ctx.fillStyle = 'white'
      ctx.fillText(`${seconds}`, canvas.width / 2, 100)
    },
    renderDestroyedScores: () => {
      ctx.fillStyle = '#00ff80'
      ctx.font = '22px VT323'

      destroyedScores.forEach(ds => {
        ctx.fillText(`+${ds[1]}`, ds[0].pos[0], ds[0].pos[1])
        ds[0].pos[1] -= 2
      })
    },
    addDestroyedScore: (word, score) => {
      setTimeout
      destroyedScores.push([{ pos: [word.pos[0], word.pos[1]] }, score])
    }
  }
}
