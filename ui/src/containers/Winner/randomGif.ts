const GIFS = [
  'https://media.giphy.com/media/4QFAH0qZ0LQnIwVYKT/source.gif',
  'https://media.giphy.com/media/3rUbeDiLFMtAOIBErf/giphy.gif',
  'https://media.giphy.com/media/l0HU20BZ6LbSEITza/giphy.gif',
  'https://media.giphy.com/media/xT4uQfHn1CUGyYsiiY/giphy.gif',
  'https://media.giphy.com/media/ckMFjYymC5KKI/giphy.gif',
  'https://media.giphy.com/media/kG9YYO1O135YhX7qu7/giphy.gif',
  'https://media.giphy.com/media/xT0xes1WIfLw0IfKqQ/giphy.gif'
]

export const randomGif = () => {
  let previousIndex = -1

  return {
    get: () => {
      let index = Math.floor(Math.random() * Math.floor(GIFS.length))
      let gif = GIFS[index]
      if (index === previousIndex) {
        const newGifs = [...GIFS]
        newGifs.splice(index, 1)
        index = Math.floor(Math.random() * Math.floor(newGifs.length))
        gif = GIFS[index]
      }
      previousIndex = index
      return gif
    }
  }
}
