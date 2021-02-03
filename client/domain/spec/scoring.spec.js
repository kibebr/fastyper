import { calculateWPM } from '../scoring.js'

describe('Scoring', () => {
  describe('WPM', () => {
    it('should output correct WPM for word "calculator" given 5 seconds', () => {
      const characters = 'calculator'.length
      
      const wpm = calculateWPM(['calculator'])(0.16)
      expect(wpm).toBe(12)
    })
  })
})
