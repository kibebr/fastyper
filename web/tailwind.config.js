const isProd = !process.env.NODE_ENV === 'development'

module.exports = {
  purge: {
    content: ['./**/*.svelte'],
    enabled: isProd
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'logo-pink': '#ff0a3b'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
