module.exports = {
    content: ['./dist/*.html', 'node_modules/preline/dist/*.js'],
    theme: {
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [
      require('preline/plugin'),
      require('@tailwindcss/forms')
    ],
  }
  