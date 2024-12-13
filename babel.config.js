const presets = ['module:@react-native/babel-preset']
const plugins = []

plugins.push(
  'react-native-paper/babel'
)

module.exports = {
  presets,
  plugins,
  env: {
    production: {
      plugins: ["transform-remove-console"],     //removing consoles.log from app during release (production) versions
    },
  },
}

